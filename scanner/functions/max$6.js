function max$6(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var reductionIndices = attrs.reductionIndices,
	      keepDims = attrs.keepDims;
	  var cpuBackend = backend;
	  var xShape = x.shape;
	  var xRank = xShape.length;
	  var origAxes = parseAxisParam(reductionIndices, xShape);
	  var axes = origAxes;
	  var permutedAxes = getAxesPermutation(axes, xRank);
	  var xVals = cpuBackend.data.get(x.dataId).values;

	  if (permutedAxes != null) {
	    var newShape = new Array(xRank);

	    for (var i = 0; i < newShape.length; i++) {
	      newShape[i] = xShape[permutedAxes[i]];
	    }

	    xVals = transposeImpl(xVals, xShape, x.dtype, permutedAxes, newShape);
	    axes = getInnerMostAxes(axes.length, xRank);
	    xShape = newShape;
	  }

	  assertNotComplex(x, 'max');
	  assertAxesAreInnerMostDims('max', axes, xRank);

	  var _backend_util$compute = computeOutAndReduceShapes(xShape, axes),
	      maxOutShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var reduceSize = sizeFromShape(reduceShape);
	  var result = maxImpl(xVals, reduceSize, maxOutShape, x.dtype);
	  var dataId = cpuBackend.write(result, maxOutShape, x.dtype);
	  var outShape = maxOutShape;

	  if (keepDims) {
	    // reshape
	    var _newShape = expandShapeToKeepDim(maxOutShape, origAxes);

	    outShape = _newShape;
	  }

	  return {
	    dataId: dataId,
	    shape: outShape,
	    dtype: x.dtype
	  };
	}