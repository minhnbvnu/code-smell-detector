function Environment(global) {
	    this.global = global;
	    this.flags = {};
	    this.flagRegistry = {};
	    this.urlFlags = {};
	    this.populateURLFlags();
	  }