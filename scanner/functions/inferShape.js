function inferShape(val, dtype) {
	  var firstElem = val;

	  if (isTypedArray$1(val)) {
	    return dtype === 'string' ? [] : [val.length];
	  }

	  if (!Array.isArray(val)) {
	    return []; // Scalar.
	  }

	  var shape = [];

	  while (Array.isArray(firstElem) || isTypedArray$1(firstElem) && dtype !== 'string') {
	    shape.push(firstElem.length);
	    firstElem = firstElem[0];
	  }

	  if (Array.isArray(val) && env().getBool('TENSORLIKE_CHECK_SHAPE_CONSISTENCY')) {
	    deepAssertShapeConsistency(val, shape, []);
	  }

	  return shape;
	}