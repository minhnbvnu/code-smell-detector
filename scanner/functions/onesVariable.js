function onesVariable(shape, dtype, name) {
	  // TODO(cais): Implement logic for dtype.
	  var allocated = ones$1(shape);
	  return new LayerVariable(allocated, dtype, name);
	}