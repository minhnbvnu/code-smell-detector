function conv2dWithBiasActivation(x, kernel, bias, strides, padding, dataFormat, dilationRate, activation) {
	  if (strides === void 0) {
	    strides = [1, 1];
	  }

	  if (padding === void 0) {
	    padding = 'valid';
	  }

	  if (activation === void 0) {
	    activation = null;
	  }

	  return tidy(function () {
	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    checkDataFormat(dataFormat);

	    if (x.rank !== 3 && x.rank !== 4) {
	      throw new ValueError("conv2dWithBiasActivation expects input to be of rank 3 or 4, " + ("but received " + x.rank + "."));
	    }

	    if (kernel.rank !== 3 && kernel.rank !== 4) {
	      throw new ValueError("conv2dWithBiasActivation expects kernel to be of rank 3 or 4, " + ("but received " + x.rank + "."));
	    }

	    var y = preprocessConv2DInput(x, dataFormat);

	    if (padding === 'causal') {
	      throw new NotImplementedError('The support for CAUSAL padding mode in conv1dWithBias is not ' + 'implemented yet.');
	    }

	    y = conv2d$1({
	      x: y,
	      filter: kernel,
	      strides: strides,
	      pad: padding === 'same' ? 'same' : 'valid',
	      dilations: dilationRate,
	      dataFormat: 'NHWC',
	      bias: bias,
	      activation: activation
	    });

	    if (dataFormat === 'channelsFirst') {
	      y = transpose(y, [0, 3, 1, 2]);
	    }

	    return y;
	  });
	}