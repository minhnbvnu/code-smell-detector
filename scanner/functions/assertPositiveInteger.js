function assertPositiveInteger(value, name) {
	  if (Array.isArray(value)) {
	    assert(value.length > 0, function () {
	      return name + " is unexpectedly an empty array.";
	    });
	    value.forEach(function (v, i) {
	      return assertPositiveInteger(v, "element " + (i + 1) + " of " + name);
	    });
	  } else {
	    assert(Number.isInteger(value) && value > 0, function () {
	      return "Expected " + name + " to be a positive integer, but got " + (formatAsFriendlyString(value) + ".");
	    });
	  }
	}