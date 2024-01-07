function conv1dWithBias(x, kernel, bias, strides, padding, dataFormat, dilationRate) {
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
	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    checkDataFormat(dataFormat); // Check the ranks of x, kernel and bias.

	    if (x.shape.length !== 3) {
	      throw new ValueError("The input of a conv1dWithBias operation should be 3, but is " + (x.shape.length + " instead."));
	    }

	    if (kernel.shape.length !== 3) {
	      throw new ValueError("The kernel for a conv1dWithBias operation should be 3, but is " + (kernel.shape.length + " instead"));
	    }

	    if (bias != null && bias.shape.length !== 1) {
	      throw new ValueError("The bias for a conv1dWithBias operation should be 1, but is " + (kernel.shape.length + " instead"));
	    } // TODO(cais): Support CAUSAL padding mode.


	    if (dataFormat === 'channelsFirst') {
	      x = transpose(x, [0, 2, 1]); // NCW -> NWC.
	    }

	    if (padding === 'causal') {
	      throw new NotImplementedError('The support for CAUSAL padding mode in conv1dWithBias is not ' + 'implemented yet.');
	    }

	    var y = conv1d(x, kernel, strides, padding === 'same' ? 'same' : 'valid', 'NWC', dilationRate);

	    if (bias != null) {
	      y = biasAdd(y, bias);
	    }

	    return y;
	  });
	}