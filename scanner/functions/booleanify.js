function booleanify(val) {
	  if (val === "true" || val == 1) {
	    return true;
	  }

	  if (val === "false" || val == 0 || !val) {
	    return false;
	  }

	  return val;
	}