function getNumChannels() {
	  if (env().getNumber('WEBGL_VERSION') === 2) {
	    return 1;
	  }

	  return 4;
	}