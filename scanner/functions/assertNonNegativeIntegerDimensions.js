function assertNonNegativeIntegerDimensions(shape) {
	  shape.forEach(function (dimSize) {
	    assert(Number.isInteger(dimSize) && dimSize >= 0, function () {
	      return "Tensor must have a shape comprised of positive integers but got " + ("shape [" + shape + "].");
	    });
	  });
	}