function AssetManager(textureLoader, pathPrefix) {
	      if (pathPrefix === void 0) {
	        pathPrefix = "";
	      }
	      this.assets = {};
	      this.errors = {};
	      this.toLoad = 0;
	      this.loaded = 0;
	      this.rawDataUris = {};
	      this.textureLoader = textureLoader;
	      this.pathPrefix = pathPrefix;
	    }