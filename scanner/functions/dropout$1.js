function dropout$1(x, level, noiseShape, seed) {
	  return tidy(function () {
	    return dropout(x, level, noiseShape, seed);
	  });
	}