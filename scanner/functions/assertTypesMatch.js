function assertTypesMatch(a, b) {
	  assert(a.dtype === b.dtype, function () {
	    return "The dtypes of the first(" + a.dtype + ") and" + (" second(" + b.dtype + ") input must match");
	  });
	}