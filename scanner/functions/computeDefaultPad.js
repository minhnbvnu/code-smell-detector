function computeDefaultPad(inputShape, fieldSize, stride, dilation) {
	  if (dilation === void 0) {
	    dilation = 1;
	  }

	  var effectiveFieldSize = getEffectiveFilterSize(fieldSize, dilation);
	  return Math.floor((inputShape[0] * (stride - 1) - stride + effectiveFieldSize) / 2);
	}