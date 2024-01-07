function proxy(fn) {
	    return function () {
	      console.trace("The node type " + _type + " has been renamed to " + newType);
	      return fn.apply(this, arguments);
	    };
	  }