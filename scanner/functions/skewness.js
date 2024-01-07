function skewness(values) {
	  // https://en.wikipedia.org/wiki/Skewness
	  var valuesMean = mean$1(values);
	  var n = values.length;
	  var sum2 = 0;
	  var sum3 = 0;

	  for (var i = 0; i < n; i++) {
	    var v = values[i] - valuesMean;
	    sum2 += Math.pow(v, 2);
	    sum3 += Math.pow(v, 3);
	  }

	  return 1 / n * sum3 / Math.pow(1 / (n - 1) * sum2, 3 / 2);
	}