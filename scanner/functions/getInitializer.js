function getInitializer(identifier) {
	  if (typeof identifier === 'string') {
	    var className = identifier in INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ? INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] : identifier;
	    /* We have four 'helper' classes for common initializers that
	    all get serialized as 'VarianceScaling' and shouldn't go through
	    the deserializeInitializer pathway. */

	    if (className === 'GlorotNormal') {
	      return new GlorotNormal();
	    } else if (className === 'GlorotUniform') {
	      return new GlorotUniform();
	    } else if (className === 'HeNormal') {
	      return new HeNormal();
	    } else if (className === 'HeUniform') {
	      return new HeUniform();
	    } else if (className === 'LeCunNormal') {
	      return new LeCunNormal();
	    } else if (className === 'LeCunUniform') {
	      return new LeCunUniform();
	    } else {
	      var config = {};
	      config['className'] = className;
	      config['config'] = {};
	      return deserializeInitializer(config);
	    }
	  } else if (identifier instanceof Initializer) {
	    return identifier;
	  } else {
	    return deserializeInitializer(identifier);
	  }
	}