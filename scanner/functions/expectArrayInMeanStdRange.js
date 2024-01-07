function expectArrayInMeanStdRange(actual, expectedMean, expectedStdDev, epsilon) {
	  if (epsilon == null) {
	    epsilon = testEpsilon();
	  }

	  var actualMean = mean$1(actual);
	  expectNumbersClose(actualMean, expectedMean, epsilon);
	  expectNumbersClose(standardDeviation(actual, actualMean), expectedStdDev, epsilon);
	}