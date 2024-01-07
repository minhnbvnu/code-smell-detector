function randomNormalVariable(shape, mean, stddev, dtype, seed, name) {
	  if (mean === void 0) {
	    mean = 0.0;
	  }

	  if (stddev === void 0) {
	    stddev = 1.0;
	  }

	  if (name === void 0) {
	    name = 'randomNormal';
	  }

	  dtype = dtype || 'float32';

	  if (dtype !== 'float32' && dtype !== 'int32') {
	    throw new NotImplementedError("randomNormalVariable does not support dType " + dtype + ".");
	  }

	  return new LayerVariable(randomNormal(shape, mean, stddev, dtype, seed), dtype, name);
	}