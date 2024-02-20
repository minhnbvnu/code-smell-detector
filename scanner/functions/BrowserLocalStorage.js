function BrowserLocalStorage(modelPath) {
	    if (!env().getBool('IS_BROWSER') || typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
	      // TODO(cais): Add more info about what IOHandler subtypes are
	      // available.
	      //   Maybe point to a doc page on the web and/or automatically determine
	      //   the available IOHandlers and print them in the error message.
	      throw new Error('The current environment does not support local storage.');
	    }

	    this.LS = window.localStorage;

	    if (modelPath == null || !modelPath) {
	      throw new Error('For local storage, modelPath must not be null, undefined or empty.');
	    }

	    this.modelPath = modelPath;
	    this.keys = getModelKeys(this.modelPath);
	  }