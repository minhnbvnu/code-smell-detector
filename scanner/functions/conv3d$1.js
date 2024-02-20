function conv3d$1(x, kernel, strides, padding, dataFormat, dilationRate) {
	  if (strides === void 0) {
	    strides = [1, 1, 1];
	  }

	  if (padding === void 0) {
	    padding = 'valid';
	  }

	  return tidy(function () {
	    checkDataFormat(dataFormat);
	    return conv3dWithBias(x, kernel, null, strides, padding, dataFormat, dilationRate);
	  });
	}