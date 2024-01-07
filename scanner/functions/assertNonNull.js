function assertNonNull(a) {
	  assert(a != null, function () {
	    return "The input to the tensor constructor must be a non-null value.";
	  });
	}