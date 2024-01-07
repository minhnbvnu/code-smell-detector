function kurtosis(values) {
	  // https://en.wikipedia.org/wiki/Kurtosis
	  var valuesMean = mean$1(values);
	  var n = values.length;
	  var sum2 = 0;
	  var sum4 = 0;

	  for (var i = 0; i < n; i++) {
	    var v = values[i] - valuesMean;
	    sum2 += Math.pow(v, 2);
	    sum4 += Math.pow(v, 4);
	  }

	  return 1 / n * sum4 / Math.pow(1 / n * sum2, 2);
	}