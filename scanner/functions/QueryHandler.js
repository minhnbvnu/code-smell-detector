function QueryHandler(options) {
	    this.options = options;
	    !options.deferSetup && this.setup();
	}