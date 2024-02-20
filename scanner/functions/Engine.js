function Engine(ENV) {
	    this.ENV = ENV;
	    this.registry = {};
	    this.registryFactory = {};
	    this.pendingBackendInitId = 0;
	    this.state = new EngineState();
	  }