function spatial2dPadding(x, padding, dataFormat) {
	  return tidy(function () {
	    if (x.rank !== 4) {
	      throw new ValueError("temporalPadding expects input tensor to be 4-D, but received a " + (x.rank + "-D tensor."));
	    }

	    if (padding == null) {
	      padding = [[1, 1], [1, 1]];
	    }

	    if (padding.length !== 2 || padding[0].length !== 2 || padding[1].length !== 2) {
	      throw new ValueError('spatial2dPadding expects `padding` to be an Array of two Arrays, ' + 'each of which is an Array of two integers.');
	    }

	    if (dataFormat == null) {
	      dataFormat = imageDataFormat();
	    }

	    if (dataFormat !== 'channelsLast' && dataFormat !== 'channelsFirst') {
	      throw new ValueError("Unknown data format: " + dataFormat + ". " + "Supported data formats are 'channelsLast' and 'channelsFirst.");
	    }

	    var pattern;

	    if (dataFormat === 'channelsFirst') {
	      pattern = [[0, 0], [0, 0], padding[0], padding[1]];
	    } else {
	      pattern = [[0, 0], padding[0], padding[1], [0, 0]];
	    }

	    return pad(x, pattern);
	  });
	}