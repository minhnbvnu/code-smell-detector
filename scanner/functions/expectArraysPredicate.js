function expectArraysPredicate(actual, expected, predicate) {
	  var checkClassType = true;

	  if (isTypedArray$1(actual) || isTypedArray$1(expected)) {
	    checkClassType = false;
	  }

	  if (isTypedArray$1(actual) && isTypedArray$1(expected)) {
	    checkClassType = true;
	  }

	  if (checkClassType) {
	    var aType = actual.constructor.name;
	    var bType = expected.constructor.name;

	    if (aType !== bType) {
	      throw new Error("Arrays are of different type. Actual: " + aType + ". " + ("Expected: " + bType));
	    }
	  }

	  if (Array.isArray(actual) && Array.isArray(expected)) {
	    var actualShape = inferShape(actual);
	    var expectedShape = inferShape(expected);

	    if (!arraysEqual(actualShape, expectedShape)) {
	      throw new Error("Arrays have different shapes. " + ("Actual: [" + actualShape + "]. Expected: [" + expectedShape + "]"));
	    }
	  }

	  var actualFlat = isTypedArray$1(actual) ? actual : flatten(actual);
	  var expectedFlat = isTypedArray$1(expected) ? expected : flatten(expected);

	  if (actualFlat.length !== expectedFlat.length) {
	    throw new Error("Arrays have different lengths actual: " + actualFlat.length + " vs " + ("expected: " + expectedFlat.length + ".\n") + ("Actual:   " + actualFlat + ".\n") + ("Expected: " + expectedFlat + "."));
	  }

	  for (var i = 0; i < expectedFlat.length; ++i) {
	    var a = actualFlat[i];
	    var e = expectedFlat[i];

	    if (!predicate(a, e)) {
	      throw new Error("Arrays differ: actual[" + i + "] = " + a + ", expected[" + i + "] = " + e + ".\n" + ("Actual:   " + actualFlat + ".\n") + ("Expected: " + expectedFlat + "."));
	    }
	  }
	}