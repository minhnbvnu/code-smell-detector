function batchNormalization(x, mean, variance, beta, gamma, epsilon) {
	  if (epsilon === void 0) {
	    epsilon = 1e-3;
	  }

	  var out;

	  if (x.rank === 2) {
	    out = batchNorm2d(x, mean, variance, beta, gamma, epsilon);
	  } else if (x.rank === 3) {
	    // TODO(cais): Check rank; give proper error message.
	    out = batchNorm3d(x, mean, variance, beta, gamma, epsilon);
	  } else if (x.rank === 4) {
	    out = batchNorm4d(x, mean, variance, beta, gamma, epsilon);
	  } else {
	    throw new NotImplementedError("batchNormalization is not implemented for array of rank " + x.rank + " " + "yet");
	  }

	  return out;
	}