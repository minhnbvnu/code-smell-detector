function pow$6(x, a) {
	  return tidy(function () {
	    if (typeof a === 'number') {
	      a = scalar(Math.round(a), 'int32');
	    }

	    if (a.dtype !== 'int32') {
	      throw new NotImplementedError("Non-int32 dtype (" + a.dtype + ") is not supported by pow() yet");
	    }

	    return pow$5(x, a);
	  });
	}