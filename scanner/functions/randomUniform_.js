function randomUniform_(shape, minval, maxval, dtype, seed) {
	  if (minval === void 0) {
	    minval = 0;
	  }

	  if (maxval === void 0) {
	    maxval = 1;
	  }

	  if (dtype === void 0) {
	    dtype = 'float32';
	  }

	  var res = buffer(shape, dtype);
	  var random = new UniformRandom(minval, maxval, null, seed);

	  for (var i = 0; i < res.values.length; i++) {
	    res.values[i] = random.nextValue();
	  }

	  return res.toTensor();
	}