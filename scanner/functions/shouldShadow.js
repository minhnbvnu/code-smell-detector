function shouldShadow(path, shadowPath) {
	  if (path.is("_forceShadow")) {
	    return true;
	  } else {
	    return shadowPath;
	  }
	}