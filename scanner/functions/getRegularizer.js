function getRegularizer(identifier) {
	  if (identifier == null) {
	    return null;
	  }

	  if (typeof identifier === 'string') {
	    var className = identifier in REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ? REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] : identifier;
	    var config = {
	      className: className,
	      config: {}
	    };
	    return deserializeRegularizer(config);
	  } else if (identifier instanceof Regularizer) {
	    return identifier;
	  } else {
	    return deserializeRegularizer(identifier);
	  }
	}