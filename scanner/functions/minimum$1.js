function minimum$1(config) {
	  if (Array.isArray(config)) {
	    var layer = new Minimum$1({});
	    return layer.apply(config);
	  } else {
	    return new Minimum$1(config);
	  }
	}