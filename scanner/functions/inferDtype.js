function inferDtype(values) {
	  if (Array.isArray(values)) {
	    return inferDtype(values[0]);
	  }

	  if (values instanceof Float32Array) {
	    return 'float32';
	  } else if (values instanceof Int32Array || values instanceof Uint8Array) {
	    return 'int32';
	  } else if (isNumber(values)) {
	    return 'float32';
	  } else if (isString(values)) {
	    return 'string';
	  } else if (isBoolean(values)) {
	    return 'bool';
	  }

	  return 'float32';
	}