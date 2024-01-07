function preprocessConv2DInput(x, dataFormat) {
	  // TODO(cais): Cast type to float32 if not.
	  return tidy(function () {
	    checkDataFormat(dataFormat);

	    if (dataFormat === 'channelsFirst') {
	      return transpose(x, [0, 2, 3, 1]); // NCHW -> NHWC.
	    } else {
	      return x;
	    }
	  });
	}