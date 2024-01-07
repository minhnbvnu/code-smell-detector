function standardDeviation(values, mean) {
	  var squareDiffSum = 0;

	  for (var i = 0; i < values.length; i++) {
	    var diff = values[i] - mean;
	    squareDiffSum += diff * diff;
	  }

	  return Math.sqrt(squareDiffSum / values.length);
	}