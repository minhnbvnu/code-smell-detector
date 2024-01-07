function truncatedNormal_(shape, mean, stdDev, dtype, seed) {
	  if (mean === void 0) {
	    mean = 0;
	  }

	  if (stdDev === void 0) {
	    stdDev = 1;
	  }

	  if (dtype != null && dtype === 'bool') {
	    throw new Error("Unsupported data type $ { dtype }");
	  }

	  var randGauss = new MPRandGauss(mean, stdDev, dtype, true
	  /* truncated */
	  , seed);
	  var res = buffer(shape, dtype);

	  for (var i = 0; i < res.values.length; i++) {
	    res.values[i] = randGauss.nextValue();
	  }

	  return res.toTensor();
	}