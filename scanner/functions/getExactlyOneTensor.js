function getExactlyOneTensor(xs) {
	  var x;

	  if (Array.isArray(xs)) {
	    if (xs.length !== 1) {
	      throw new ValueError("Expected Tensor length to be 1; got " + xs.length);
	    }

	    x = xs[0];
	  } else {
	    x = xs;
	  }

	  return x;
	}