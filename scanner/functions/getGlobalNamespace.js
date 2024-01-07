function getGlobalNamespace() {
	  if (globalNameSpace == null) {
	    // tslint:disable-next-line:no-any
	    var ns;

	    if (typeof window !== 'undefined') {
	      ns = window;
	    } else if (typeof global !== 'undefined') {
	      ns = global;
	    } else if (typeof process !== 'undefined') {
	      ns = process;
	    } else if (typeof self !== 'undefined') {
	      ns = self;
	    } else {
	      throw new Error('Could not find a global object');
	    }

	    globalNameSpace = ns;
	  }

	  return globalNameSpace;
	}