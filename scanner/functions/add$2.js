function add$2(config) {
	  if (Array.isArray(config)) {
	    var layer = new Add$1({});
	    return layer.apply(config);
	  } else {
	    return new Add$1(config);
	  }
	}