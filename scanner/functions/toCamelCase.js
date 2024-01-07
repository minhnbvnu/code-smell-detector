function toCamelCase(identifier) {
	  // quick return for empty string or single character strings
	  if (identifier.length <= 1) {
	    return identifier;
	  } // Check for the underscore indicating snake_case


	  if (identifier.indexOf('_') === -1) {
	    return identifier;
	  }

	  return identifier.replace(/[_]+(\w|$)/g, function (m, p1) {
	    return p1.toUpperCase();
	  });
	}