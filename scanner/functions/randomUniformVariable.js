function randomUniformVariable(shape, minval, maxval, dtype, seed, name) {
	  if (name === void 0) {
	    name = 'randomUniform';
	  }

	  return new LayerVariable(randomUniform(shape, minval, maxval, dtype), dtype, name);
	}