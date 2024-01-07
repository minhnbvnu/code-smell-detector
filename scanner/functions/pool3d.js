function pool3d(x, poolSize, strides, padding, dataFormat, poolMode) {
	  return tidy(function () {
	    checkDataFormat(dataFormat);
	    checkPoolMode(poolMode);
	    checkPaddingMode(padding);

	    if (strides == null) {
	      strides = [1, 1, 1];
	    }

	    if (padding == null) {
	      padding = 'valid';
	    }

	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    if (poolMode == null) {
	      poolMode = 'max';
	    } // x is NDHWC after preprocessing.


	    x = preprocessConv3DInput(x, dataFormat);
	    var y;
	    var paddingString = padding === 'same' ? 'same' : 'valid';

	    if (poolMode === 'max') {
	      y = maxPool3d(x, poolSize, strides, paddingString);
	    } else {
	      // 'avg'
	      y = avgPool3d(x, poolSize, strides, paddingString);
	    }

	    if (dataFormat === 'channelsFirst') {
	      y = transpose(y, [0, 4, 1, 2, 3]); // NDHWC -> NCDHW.
	    }

	    return y;
	  });
	}