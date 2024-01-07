function average(config) {
	  if (Array.isArray(config)) {
	    var layer = new Average({});
	    return layer.apply(config);
	  } else {
	    return new Average(config);
	  }
	}