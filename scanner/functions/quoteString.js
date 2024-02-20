function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }