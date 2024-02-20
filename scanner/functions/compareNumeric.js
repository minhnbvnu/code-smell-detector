function compareNumeric(a, b) {
	  var aPrefix = a.match(numericRegex)[1];
	  var bPrefix = b.match(numericRegex)[1];
	  var aNumeric = parseInt(aPrefix, 10);
	  var bNumeric = parseInt(bPrefix, 10);

	  if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
	    return compare(aNumeric, bNumeric);
	  } else {
	    return compare(a, b);
	  }
	}