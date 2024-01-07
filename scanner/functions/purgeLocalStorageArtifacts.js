function purgeLocalStorageArtifacts() {
	  if (!env().getBool('IS_BROWSER') || typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
	    throw new Error('purgeLocalStorageModels() cannot proceed because local storage is ' + 'unavailable in the current environment.');
	  }

	  var LS = window.localStorage;
	  var purgedModelPaths = [];

	  for (var i = 0; i < LS.length; ++i) {
	    var key = LS.key(i);
	    var prefix = PATH_PREFIX + PATH_SEPARATOR;

	    if (key.startsWith(prefix) && key.length > prefix.length) {
	      LS.removeItem(key);
	      var modelName = getModelPathFromKey(key);

	      if (purgedModelPaths.indexOf(modelName) === -1) {
	        purgedModelPaths.push(modelName);
	      }
	    }
	  }

	  return purgedModelPaths;
	}