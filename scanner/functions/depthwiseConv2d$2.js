function depthwiseConv2d$2(x, depthwiseKernel, strides, padding, dataFormat, dilationRate) {
	  if (strides === void 0) {
	    strides = [1, 1];
	  }

	  if (padding === void 0) {
	    padding = 'valid';
	  }

	  return tidy(function () {
	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    checkDataFormat(dataFormat);
	    var y = preprocessConv2DInput(x, dataFormat);

	    if (x.rank !== 4) {
	      throw new ValueError("Input for depthwiseConv2d is required to be 4-D, but is instead " + (x.rank + "-D"));
	    }

	    if (depthwiseKernel.rank !== 4) {
	      throw new ValueError("depthwiseKernel is required to be 4-D, but is instead " + (depthwiseKernel.rank + "-D"));
	    }

	    y = depthwiseConv2d(y, depthwiseKernel, strides, padding === 'same' ? 'same' : 'valid', 'NHWC', dilationRate);

	    if (dataFormat === 'channelsFirst') {
	      y = transpose(y, [0, 3, 1, 2]);
	    }

	    return y;
	  });
	}