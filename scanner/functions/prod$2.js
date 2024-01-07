function prod$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      keepDims = attrs.keepDims;
	  var xRank = x.shape.length;
	  var toDispose = [];
	  var origAxes = parseAxisParam(axis, x.shape);
	  var axes = origAxes;
	  var permutedAxes = getAxesPermutation(axes, xRank);
	  var permutedX = x;

	  if (permutedAxes != null) {
	    permutedX = transpose$2({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutedAxes
	      }
	    });
	    axes = getInnerMostAxes(axes.length, xRank);
	    toDispose.push(permutedX);
	  }

	  assertAxesAreInnerMostDims('prod', axes, xRank);
	  var res;

	  if (backend.shouldExecuteOnCPU([permutedX])) {
	    var xVals = backend.texData.get(permutedX.dataId).values;

	    var _prodImplCPU = prodImplCPU(permutedX.shape, permutedX.dtype, xVals, axes),
	        outVals = _prodImplCPU.outVals,
	        outShape = _prodImplCPU.outShape,
	        outDtype = _prodImplCPU.outDtype;

	    res = backend.makeTensorInfo(outShape, outDtype, outVals);
	  } else {
	    var _backend_util$compute = computeOutAndReduceShapes(permutedX.shape, axes),
	        _outShape = _backend_util$compute[0],
	        reduceShape = _backend_util$compute[1];

	    var inSize = sizeFromShape(reduceShape);
	    var a2D = reshape$3({
	      inputs: {
	        x: permutedX
	      },
	      backend: backend,
	      attrs: {
	        shape: [-1, inSize]
	      }
	    });
	    var outputDType = sumOutType(x.dtype);
	    var reduced = reduce(a2D, outputDType, 'prod', backend);
	    res = reshape$3({
	      inputs: {
	        x: reduced
	      },
	      backend: backend,
	      attrs: {
	        shape: _outShape
	      }
	    });
	    toDispose.push(a2D);
	    toDispose.push(reduced);
	  }

	  if (keepDims) {
	    toDispose.push(res);
	    var newShape = expandShapeToKeepDim(res.shape, origAxes);
	    res = reshape$3({
	      inputs: {
	        x: res
	      },
	      backend: backend,
	      attrs: {
	        shape: newShape
	      }
	    });
	  }

	  toDispose.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return res;
	}