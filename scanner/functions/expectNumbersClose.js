function expectNumbersClose(a, e, epsilon) {
	  if (epsilon == null) {
	    epsilon = testEpsilon();
	  }

	  if (!areClose(a, e, epsilon)) {
	    throw new Error("Numbers differ: actual === " + a + ", expected === " + e);
	  }
	}