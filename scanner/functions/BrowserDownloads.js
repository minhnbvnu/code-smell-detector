function BrowserDownloads(fileNamePrefix) {
	    if (!env().getBool('IS_BROWSER')) {
	      // TODO(cais): Provide info on what IOHandlers are available under the
	      //   current environment.
	      throw new Error('browserDownloads() cannot proceed because the current environment ' + 'is not a browser.');
	    }

	    if (fileNamePrefix.startsWith(BrowserDownloads.URL_SCHEME)) {
	      fileNamePrefix = fileNamePrefix.slice(BrowserDownloads.URL_SCHEME.length);
	    }

	    if (fileNamePrefix == null || fileNamePrefix.length === 0) {
	      fileNamePrefix = DEFAULT_FILE_NAME_PREFIX;
	    }

	    this.modelTopologyFileName = fileNamePrefix + DEFAULT_JSON_EXTENSION_NAME;
	    this.weightDataFileName = fileNamePrefix + DEFAULT_WEIGHT_DATA_EXTENSION_NAME;
	  }