function checkRangeExpression(range, version) {
	  var expressions = range.split(rangeRegex);

	  !(expressions.length > 0 && expressions.length <= 2) ?  true ? invariant(false, 'the "-" operator expects exactly 2 operands') : invariant(false) : void 0;

	  if (expressions.length === 1) {
	    return checkSimpleExpression(expressions[0], version);
	  } else {
	    var startVersion = expressions[0],
	        endVersion = expressions[1];

	    !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ?  true ? invariant(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant(false) : void 0;

	    return checkSimpleExpression('>=' + startVersion, version) && checkSimpleExpression('<=' + endVersion, version);
	  }
	}