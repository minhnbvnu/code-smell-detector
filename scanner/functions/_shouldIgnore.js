function _shouldIgnore(pattern, filename) {
	  if (typeof pattern === "function") {
	    return pattern(filename);
	  } else {
	    return pattern.test(filename);
	  }
	}