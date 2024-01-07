function isSliceContinous(shape, begin, size) {
	  // Index of the first axis that has size > 1.
	  var firstNonOneAxis = size.length;

	  for (var i = 0; i < size.length; i++) {
	    if (size[i] > 1) {
	      firstNonOneAxis = i;
	      break;
	    }
	  }

	  for (var _i2 = firstNonOneAxis + 1; _i2 < size.length; _i2++) {
	    if (begin[_i2] > 0 || size[_i2] !== shape[_i2]) {
	      return false;
	    }
	  }

	  return true;
	}