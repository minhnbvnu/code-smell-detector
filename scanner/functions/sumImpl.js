function sumImpl(x, axis, keepDims, backend) {
	  var reductionIndices = axis;
	  var xRank = x.shape.length;
	  var origAxes = parseAxisParam(reductionIndices, x.shape);
	  var axes = origAxes;
	  var permutedAxes = getAxesPermutation(axes, xRank);
	  var sumInputIsTransposed = permutedAxes != null;
	  var sumInput = x;

	  if (sumInputIsTransposed) {
	    sumInput = transposeImpl$1(x, permutedAxes, backend);
	    axes = getInnerMostAxes(axes.length, xRank);
	  }

	  assertAxesAreInnerMostDims('sum', axes, xRank);

	  var _backend_util$compute = computeOutAndReduceShapes(sumInput.shape, axes),
	      sumOutShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var outShape = sumOutShape;

	  if (keepDims) {
	    // rather than reshape at the end, set the target shape here.
	    outShape = expandShapeToKeepDim(sumOutShape, origAxes);
	  }

	  var inSize = sizeFromShape(reduceShape);
	  var xSize = sizeFromShape(x.shape);
	  var batchSize = xSize / inSize;
	  var reshapedInput = reshape$3({
	    inputs: {
	      x: sumInput
	    },
	    attrs: {
	      shape: [batchSize, inSize]
	    },
	    backend: backend
	  });
	  var outType = sumOutType(x.dtype);
	  var reduced = reduce(reshapedInput, outType, 'sum', backend);
	  var out = reshape$3({
	    inputs: {
	      x: reduced
	    },
	    attrs: {
	      shape: outShape
	    },
	    backend: backend
	  });
	  backend.disposeIntermediateTensorInfo(reshapedInput);
	  backend.disposeIntermediateTensorInfo(reduced);

	  if (sumInputIsTransposed) {
	    backend.disposeIntermediateTensorInfo(sumInput);
	  }

	  return out;
	}