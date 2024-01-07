function conv3dWithBias(x, kernel, bias, strides, padding, dataFormat, dilationRate) {
	  if (strides === void 0) {
	    strides = [1, 1, 1];
	  }

	  if (padding === void 0) {
	    padding = 'valid';
	  }

	  return tidy(function () {
	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    checkDataFormat(dataFormat);

	    if (x.rank !== 4 && x.rank !== 5) {
	      throw new ValueError("conv3dWithBias expects input to be of rank 4 or 5, but received " + (x.rank + "."));
	    }

	    if (kernel.rank !== 4 && kernel.rank !== 5) {
	      throw new ValueError("conv3dWithBias expects kernel to be of rank 4 or 5, but received " + (x.rank + "."));
	    }

	    var y = preprocessConv3DInput(x, dataFormat);

	    if (padding === 'causal') {
	      throw new NotImplementedError('The support for CAUSAL padding mode in conv3dWithBias is not ' + 'implemented yet.');
	    }

	    y = conv3d(y, kernel, strides, padding === 'same' ? 'same' : 'valid', 'NDHWC', dilationRate);

	    if (bias != null) {
	      y = biasAdd(y, bias);
	    }

	    if (dataFormat === 'channelsFirst') {
	      y = transpose(y, [0, 4, 1, 2, 3]);
	    }

	    return y;
	  });
	}