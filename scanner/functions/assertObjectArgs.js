function assertObjectArgs(args) {
	  if (args != null && typeof args !== 'object') {
	    throw new Error("Argument to L1L2 regularizer's constructor is expected to be an " + ("object, but received: " + args));
	  }
	}