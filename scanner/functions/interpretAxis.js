function interpretAxis(axis, dim) {
	  while (axis < 0) {
	    axis += dim;
	  }

	  return axis;
	}