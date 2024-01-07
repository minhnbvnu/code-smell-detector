function preprocessConv3DInput(x, dataFormat) {
	  return tidy(function () {
	    checkDataFormat(dataFormat);

	    if (dataFormat === 'channelsFirst') {
	      return transpose(x, [0, 2, 3, 4, 1]); // NCDHW -> NDHWC.
	    } else {
	      return x;
	    }
	  });
	}