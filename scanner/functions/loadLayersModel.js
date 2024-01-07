function loadLayersModel(pathOrIOHandler, options) {
	  if (options == null) {
	    options = {};
	  }

	  return loadLayersModelInternal(pathOrIOHandler, options);
	}