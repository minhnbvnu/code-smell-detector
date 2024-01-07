function SharedAssetManager(pathPrefix) {
	      if (pathPrefix === void 0) {
	        pathPrefix = "";
	      }
	      this.clientAssets = {};
	      this.queuedAssets = {};
	      this.rawAssets = {};
	      this.errors = {};
	      this.pathPrefix = pathPrefix;
	    }