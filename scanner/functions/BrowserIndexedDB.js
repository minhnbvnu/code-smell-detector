function BrowserIndexedDB(modelPath) {
	    this.indexedDB = getIndexedDBFactory();

	    if (modelPath == null || !modelPath) {
	      throw new Error('For IndexedDB, modelPath must not be null, undefined or empty.');
	    }

	    this.modelPath = modelPath;
	  }