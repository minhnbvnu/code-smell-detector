function expectArraysClose(actual, expected, epsilon) {
	  if (epsilon == null) {
	    epsilon = testEpsilon();
	  }

	  return expectArraysPredicate(actual, expected, function (a, b) {
	    return areClose(a, b, epsilon);
	  });
	}