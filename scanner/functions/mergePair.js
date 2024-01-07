function mergePair(dest, src) {
	  for (var key in src) {
	    dest[key] = [].concat(dest[key] || [], src[key]);
	  }
	}