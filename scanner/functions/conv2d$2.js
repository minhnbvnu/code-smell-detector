function conv2d$2(x, kernel, strides, padding, dataFormat, dilationRate) {
	  if (strides === void 0) {
	    strides = [1, 1];
	  }

	  if (padding === void 0) {
	    padding = 'valid';
	  }

	  return tidy(function () {
	    checkDataFormat(dataFormat);
	    return conv2dWithBiasActivation(x, kernel, null, strides, padding, dataFormat, dilationRate);
	  });
	}