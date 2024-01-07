function parseValue(flagName, value) {
	  value = value.toLowerCase();

	  if (value === 'true' || value === 'false') {
	    return value === 'true';
	  } else if ("" + +value === value) {
	    return +value;
	  }

	  throw new Error("Could not parse value flag value " + value + " for flag " + flagName + ".");
	}