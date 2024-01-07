function getActivation(identifier) {
	  if (identifier == null) {
	    var config = {};
	    config['className'] = 'linear';
	    config['config'] = {};
	    return deserializeActivation(config);
	  }

	  if (typeof identifier === 'string') {
	    var _config = {};
	    _config['className'] = identifier;
	    _config['config'] = {};
	    return deserializeActivation(_config);
	  } else if (identifier instanceof Activation) {
	    return identifier;
	  } else {
	    return deserializeActivation(identifier);
	  }
	}