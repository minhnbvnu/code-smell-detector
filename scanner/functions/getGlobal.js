function getGlobal(key, init) {
	  var globalMap = getGlobalMap();

	  if (globalMap.has(key)) {
	    return globalMap.get(key);
	  } else {
	    var singleton = init();
	    globalMap.set(key, singleton);
	    return globalMap.get(key);
	  }
	}