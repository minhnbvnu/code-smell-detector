function convOutputLength(inputLength, filterSize, padding, stride, dilation) {
	  if (dilation === void 0) {
	    dilation = 1;
	  }

	  if (inputLength == null) {
	    return inputLength;
	  }

	  var dilatedFilterSize = filterSize + (filterSize - 1) * (dilation - 1);
	  var outputLength;

	  if (padding === 'same') {
	    outputLength = inputLength;
	  } else {
	    // VALID
	    outputLength = inputLength - dilatedFilterSize + 1;
	  }

	  return Math.floor((outputLength + stride - 1) / stride);
	}