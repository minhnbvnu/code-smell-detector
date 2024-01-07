function expectArraysEqual(actual, expected) {
	  var exp = typeof expected === 'string' || typeof expected === 'number' || typeof expected === 'boolean' ? [expected] : expected;

	  if (isString(actual) || isString(actual[0]) || isString(expected) || isString(expected[0])) {
	    // tslint:disable-next-line: triple-equals
	    return expectArraysPredicate(actual, exp, function (a, b) {
	      return a == b;
	    });
	  }

	  return expectArraysPredicate(actual, expected, function (a, b) {
	    return areClose(a, b, 0);
	  });
	}