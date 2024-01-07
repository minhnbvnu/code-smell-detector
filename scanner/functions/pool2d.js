function pool2d(x, poolSize, strides, padding, dataFormat, poolMode) {
	  return tidy(function () {
	    checkDataFormat(dataFormat);
	    checkPoolMode(poolMode);
	    checkPaddingMode(padding);

	    if (strides == null) {
	      strides = [1, 1];
	    }

	    if (padding == null) {
	      padding = 'valid';
	    }

	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    if (poolMode == null) {
	      poolMode = 'max';
	    } // TODO(cais): Remove the preprocessing step once deeplearn.js supports
	    // dataFormat as an input argument.


	    x = preprocessConv2DInput(x, dataFormat); // x is NHWC after preprocessing.

	    var y;
	    var paddingString = padding === 'same' ? 'same' : 'valid';

	    if (poolMode === 'max') {
	      // TODO(cais): Rank check?
	      y = maxPool(x, poolSize, strides, paddingString);
	    } else {
	      // 'avg'
	      // TODO(cais): Check the dtype and rank of x and give clear error message
	      //   if those are incorrect.
	      y = avgPool( // TODO(cais): Rank check?
	      x, poolSize, strides, paddingString);
	    }

	    if (dataFormat === 'channelsFirst') {
	      y = transpose(y, [0, 3, 1, 2]); // NHWC -> NCHW.
	    }

	    return y;
	  });
	}