function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }