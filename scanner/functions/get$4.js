function get$4(identifier) {
	  if (typeof identifier === 'string' && identifier in metricsMap) {
	    return metricsMap[identifier];
	  } else if (typeof identifier !== 'string' && identifier != null) {
	    return identifier;
	  } else {
	    throw new ValueError("Unknown metric " + identifier);
	  }
	}