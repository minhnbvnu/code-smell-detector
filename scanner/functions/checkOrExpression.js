function checkOrExpression(range, version) {
	  var expressions = range.split(orRegex);

	  if (expressions.length > 1) {
	    return expressions.some(function (range) {
	      return VersionRange.contains(range, version);
	    });
	  } else {
	    range = expressions[0].trim();
	    return checkRangeExpression(range, version);
	  }
	}