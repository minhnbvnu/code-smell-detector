function toListOrNull(x) {
	    if (x == null || Array.isArray(x)) {
	      return x;
	    } else {
	      return [x];
	    }
	  }