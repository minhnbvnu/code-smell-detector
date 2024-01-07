function elu$1(x, alpha) {
	  if (alpha === void 0) {
	    alpha = 1;
	  }

	  // TODO(cais): Add support for alpha values other than 1.
	  if (alpha !== 1) {
	    throw new NotImplementedError("Support for alpha values other than 1 (" + alpha + ") is not implemented " + "yet.");
	  }

	  return elu(x);
	}