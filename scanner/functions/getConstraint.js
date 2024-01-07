function getConstraint(identifier) {
	  if (identifier == null) {
	    return null;
	  }

	  if (typeof identifier === 'string') {
	    var className = identifier in CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP ? CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] : identifier;
	    var config = {
	      className: className,
	      config: {}
	    };
	    return deserializeConstraint(config);
	  } else if (identifier instanceof Constraint) {
	    return identifier;
	  } else {
	    return deserializeConstraint(identifier);
	  }
	}