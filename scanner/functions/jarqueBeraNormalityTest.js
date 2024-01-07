function jarqueBeraNormalityTest(values) {
	  // https://en.wikipedia.org/wiki/Jarque%E2%80%93Bera_test
	  var n = values.length;
	  var s = skewness(values);
	  var k = kurtosis(values);
	  var jb = n / 6 * (Math.pow(s, 2) + 0.25 * Math.pow(k - 3, 2)); // JB test requires 2-degress of freedom from Chi-Square @ 0.95:
	  // http://www.itl.nist.gov/div898/handbook/eda/section3/eda3674.htm

	  var CHI_SQUARE_2DEG = 5.991;

	  if (jb > CHI_SQUARE_2DEG) {
	    throw new Error("Invalid p-value for JB: " + jb);
	  }
	}