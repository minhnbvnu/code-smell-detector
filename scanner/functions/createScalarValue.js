function createScalarValue(value, dtype) {
	  if (dtype === 'string') {
	    return encodeString(value);
	  }

	  return toTypedArray([value], dtype);
	}