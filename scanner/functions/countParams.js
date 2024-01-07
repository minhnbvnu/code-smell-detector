function countParams(x) {
	  var shape = x.shape;

	  if (shape.length > 0) {
	    return shape.reduce(function (a, b) {
	      return a * b;
	    });
	  } else {
	    // Scalar.
	    return 1;
	  }
	}