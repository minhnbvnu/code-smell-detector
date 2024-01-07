function randomNormal$1(shape, mean, stddev, dtype, seed) {
	  if (mean === void 0) {
	    mean = 0.0;
	  }

	  if (stddev === void 0) {
	    stddev = 1.0;
	  }

	  return randomNormal(shape, mean, stddev, dtype, seed);
	}