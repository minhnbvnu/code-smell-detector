function convertConv2DDataFormat(dataFormat) {
	  if (dataFormat === 'NHWC') {
	    return 'channelsLast';
	  } else if (dataFormat === 'NCHW') {
	    return 'channelsFirst';
	  } else {
	    throw new Error("Unknown dataFormat " + dataFormat);
	  }
	}