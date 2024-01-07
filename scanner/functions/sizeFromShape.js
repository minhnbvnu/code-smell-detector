function sizeFromShape(shape) {
	  if (shape.length === 0) {
	    // Scalar.
	    return 1;
	  }

	  var size = shape[0];

	  for (var i = 1; i < shape.length; i++) {
	    size *= shape[i];
	  }

	  return size;
	}