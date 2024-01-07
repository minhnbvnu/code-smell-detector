function decodeString(bytes, encoding) {
	  if (encoding === void 0) {
	    encoding = 'utf-8';
	  }

	  encoding = encoding || 'utf-8';
	  return env().platform.decode(bytes, encoding);
	}