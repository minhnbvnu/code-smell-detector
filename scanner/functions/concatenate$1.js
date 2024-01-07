function concatenate$1(config) {
	  if (Array.isArray(config)) {
	    var layer = new Concatenate({});
	    return layer.apply(config);
	  } else {
	    return new Concatenate(config);
	  }
	}