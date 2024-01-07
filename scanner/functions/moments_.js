function moments_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  x = convertToTensor(x, 'x', 'moments');
	  var axes = parseAxisParam(axis, x.shape);
	  var xMean = mean(x, axes, keepDims);
	  var keepDimsShape = xMean.shape;

	  if (!keepDims) {
	    keepDimsShape = expandShapeToKeepDim(xMean.shape, axes);
	  }

	  var devSquared = square(sub(cast(x, 'float32'), reshape(xMean, keepDimsShape)));
	  var variance = mean(devSquared, axes, keepDims);
	  return {
	    mean: xMean,
	    variance: variance
	  };
	}