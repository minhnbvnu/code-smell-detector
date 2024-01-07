function makeTypesMatch(a, b) {
	  if (a.dtype === b.dtype) {
	    return [a, b];
	  }

	  var dtype = upcastType(a.dtype, b.dtype);
	  return [a.cast(dtype), b.cast(dtype)];
	}