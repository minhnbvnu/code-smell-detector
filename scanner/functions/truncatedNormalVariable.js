function truncatedNormalVariable(shape, mean, stddev, dtype, seed, name) {
	  if (mean === void 0) {
	    mean = 0.0;
	  }

	  if (stddev === void 0) {
	    stddev = 1.0;
	  }

	  if (name === void 0) {
	    name = 'truncatedNormal';
	  }

	  // TODO(cais): Implement logic for dtype and seed once they are supported
	  // by deeplearn.js.
	  dtype = dtype || 'float32';

	  if (dtype !== 'float32' && dtype !== 'int32') {
	    throw new NotImplementedError("randomNormal does not support dType " + dtype + ".");
	  }

	  return new LayerVariable(truncatedNormal(shape, mean, stddev, dtype, seed), dtype, name);
	}