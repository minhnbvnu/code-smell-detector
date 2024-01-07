function getBatchDim(shape, dimsToSkip) {
	  if (dimsToSkip === void 0) {
	    dimsToSkip = 2;
	  }

	  return sizeFromShape(shape.slice(0, shape.length - dimsToSkip));
	}