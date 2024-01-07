function maximum$1(config) {
	  if (Array.isArray(config)) {
	    var layer = new Maximum$1({});
	    return layer.apply(config);
	  } else {
	    return new Maximum$1(config);
	  }
	}