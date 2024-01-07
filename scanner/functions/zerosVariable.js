function zerosVariable(shape, dtype, name) {
	  // TODO(cais): Implement logic for dtype.
	  return new LayerVariable(zeros(shape), dtype, name);
	}