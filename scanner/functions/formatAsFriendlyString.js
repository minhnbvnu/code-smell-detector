function formatAsFriendlyString(value) {
	  if (value === null) {
	    return 'null';
	  } else if (Array.isArray(value)) {
	    return '[' + value.map(function (v) {
	      return formatAsFriendlyString(v);
	    }).join(',') + ']';
	  } else if (typeof value === 'string') {
	    return "\"" + value + "\"";
	  } else {
	    return "" + value;
	  }
	}