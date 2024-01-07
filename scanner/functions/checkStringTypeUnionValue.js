function checkStringTypeUnionValue(values, label, value) {
	  if (value == null) {
	    return;
	  }

	  if (values.indexOf(value) < 0) {
	    throw new ValueError(value + " is not a valid " + label + ".  Valid values are " + values + " or null/undefined.");
	  }
	}