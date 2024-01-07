function cast_(x, dtype) {
	  var $x = convertToTensor(x, 'x', 'cast'); // Sanity checks.

	  if (!isValidDtype(dtype)) {
	    throw new Error("Failed to cast to unknown dtype " + dtype);
	  }

	  if (dtype === 'string' && $x.dtype !== 'string' || dtype !== 'string' && $x.dtype === 'string') {
	    throw new Error('Only strings can be casted to strings');
	  }

	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    dtype: dtype
	  };
	  return ENGINE.runKernel(Cast, inputs, attrs);
	}