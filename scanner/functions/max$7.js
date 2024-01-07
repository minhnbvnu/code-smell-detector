function max$7(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var reductionIndices = attrs.reductionIndices,
	      keepDims = attrs.keepDims;
	  var xRank = x.shape.length;
	  var origAxes = parseAxisParam(reductionIndices, x.shape);
	  var axes = origAxes;
	  var permutedAxes = getAxesPermutation(axes, xRank);
	  var maxInputIsTransposed = permutedAxes != null;
	  var shouldExecuteOnCPU = backend.shouldExecuteOnCPU([x]);
	  var maxInput = x;

	  if (maxInputIsTransposed) {
	    if (shouldExecuteOnCPU) {
	      var xTexData = backend.texData.get(maxInput.dataId);
	      var values = xTexData.values;
	      var newShape = new Array(xRank);

	      for (var i = 0; i < newShape.length; i++) {
	        newShape[i] = x.shape[permutedAxes[i]];
	      }

	      var maxInputValues = transposeImplCPU(values, x.shape, x.dtype, permutedAxes, newShape);
	      maxInput = backend.makeTensorInfo(newShape, x.dtype);
	      var maxInputData = backend.texData.get(maxInput.dataId);
	      maxInputData.values = maxInputValues;
	    } else {
	      maxInput = transposeImpl$1(x, permutedAxes, backend);
	    }

	    axes = getInnerMostAxes(axes.length, xRank);
	  }

	  assertAxesAreInnerMostDims('max', axes, xRank);

	  var _backend_util$compute = computeOutAndReduceShapes(maxInput.shape, axes),
	      maxOutShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var outShape = maxOutShape;

	  if (keepDims) {
	    // rather than reshape at the end, set the target shape here.
	    outShape = expandShapeToKeepDim(maxOutShape, origAxes);
	  }

	  var out;

	  if (shouldExecuteOnCPU) {
	    var _xTexData = backend.texData.get(maxInput.dataId);

	    var _values = _xTexData.values;
	    var outValues = maxImplCPU(_values, sizeFromShape(reduceShape), outShape, x.dtype);
	    out = backend.makeTensorInfo(outShape, x.dtype);
	    var outData = backend.texData.get(out.dataId);
	    outData.values = outValues;
	  } else {
	    out = maxImpl$1(maxInput, reduceShape, outShape, backend);
	  }

	  if (maxInputIsTransposed) {
	    backend.disposeIntermediateTensorInfo(maxInput);
	  }

	  return out;
	}