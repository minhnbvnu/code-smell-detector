function GraphModel(modelUrl, loadOptions) {
	    if (loadOptions === void 0) {
	      loadOptions = {};
	    }

	    this.modelUrl = modelUrl;
	    this.loadOptions = loadOptions;
	    this.version = 'n/a';

	    if (loadOptions == null) {
	      this.loadOptions = {};
	    }

	    this.resourceManager = new ResourceManager();
	  }