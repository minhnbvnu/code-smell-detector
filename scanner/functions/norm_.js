function norm_(x, ord, axis, keepDims) {
	  if (ord === void 0) {
	    ord = 'euclidean';
	  }

	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  x = convertToTensor(x, 'x', 'norm');
	  var norm = normImpl(x, ord, axis);
	  var keepDimsShape = norm.shape;

	  if (keepDims) {
	    var axes = parseAxisParam(axis, x.shape);
	    keepDimsShape = expandShapeToKeepDim(norm.shape, axes);
	  }

	  return reshape(norm, keepDimsShape);
	}