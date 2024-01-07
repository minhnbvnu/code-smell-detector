function assert$1(val, message) {
	  if (!val) {
	    throw new AssertionError(message);
	  }
	}