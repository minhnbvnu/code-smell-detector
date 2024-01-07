function encodeString(s, encoding) {
	  if (encoding === void 0) {
	    encoding = 'utf-8';
	  }

	  encoding = encoding || 'utf-8';
	  return env().platform.encode(s, encoding);
	}