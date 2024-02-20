function from$1(that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer$1(that, value, encodingOrOffset, length);
	  }

	  if (typeof value === 'string') {
	    return fromString$1(that, value, encodingOrOffset);
	  }

	  return fromObject$1(that, value);
	}