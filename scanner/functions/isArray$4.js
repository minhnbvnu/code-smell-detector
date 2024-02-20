function isArray$4(array) {
	  if (this.supportsIsArray()) {
	    return Array.isArray(array);
	  }

	  return toString.call(array) === '[object Array]';
	}