function prod$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      keepDims = attrs.keepDims;
	  assertNotComplex(x, 'prod');
	  var xRank = x.shape.length;
	  var axes = parseAxisParam(axis, x.shape);
	  var permutation = getAxesPermutation(axes, xRank);
	  var reductionAxes = axes;
	  var permutedX = x;
	  var intermediateTensorInfos = [];

	  if (permutation != null) {
	    permutedX = transpose$1({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutation
	      }
	    });
	    intermediateTensorInfos.push(permutedX);
	    reductionAxes = getInnerMostAxes(reductionAxes.length, xRank);
	  }

	  var xVals = backend.data.get(permutedX.dataId).values;

	  var _prodImpl = prodImpl(permutedX.shape, permutedX.dtype, xVals, reductionAxes),
	      outVals = _prodImpl.outVals,
	      outShape = _prodImpl.outShape,
	      outDtype = _prodImpl.outDtype;

	  var resultShape = outShape;

	  if (keepDims) {
	    resultShape = expandShapeToKeepDim(outShape, axes);
	  }

	  intermediateTensorInfos.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return backend.makeTensorInfo(resultShape, outDtype, outVals);
	}