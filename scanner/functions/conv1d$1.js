function conv1d$1(x, kernel, strides, padding, dataFormat, dilationRate) {
	  if (strides === void 0) {
	    strides = 1;
	  }

	  if (padding === void 0) {
	    padding = 'valid';
	  }

	  if (dilationRate === void 0) {
	    dilationRate = 1;
	  }

	  return tidy(function () {
	    checkDataFormat(dataFormat);
	    return conv1dWithBias(x, kernel, null, strides, padding, dataFormat, dilationRate);
	  });
	}