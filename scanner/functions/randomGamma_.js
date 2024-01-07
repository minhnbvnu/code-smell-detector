function randomGamma_(shape, alpha, beta, dtype, seed) {
	  if (beta === void 0) {
	    beta = 1;
	  }

	  if (dtype === void 0) {
	    dtype = 'float32';
	  }

	  if (beta == null) {
	    beta = 1;
	  }

	  if (dtype == null) {
	    dtype = 'float32';
	  }

	  if (dtype !== 'float32' && dtype !== 'int32') {
	    throw new Error("Unsupported data type " + dtype);
	  }

	  var rgamma = new RandGamma(alpha, beta, dtype, seed);
	  var res = buffer(shape, dtype);

	  for (var i = 0; i < res.values.length; i++) {
	    res.values[i] = rgamma.nextValue();
	  }

	  return res.toTensor();
	}