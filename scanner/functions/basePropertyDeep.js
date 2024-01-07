function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}