function expectValuesInRange(actual, low, high) {
	  for (var i = 0; i < actual.length; i++) {
	    if (actual[i] < low || actual[i] > high) {
	      throw new Error("Value out of range:" + actual[i] + " low: " + low + ", high: " + high);
	    }
	  }
	}