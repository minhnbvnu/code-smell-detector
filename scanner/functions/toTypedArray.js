function toTypedArray(a, dtype) {
	  if (dtype === 'string') {
	    throw new Error('Cannot convert a string[] to a TypedArray');
	  }

	  if (Array.isArray(a)) {
	    a = flatten(a);
	  }

	  if (env().getBool('DEBUG')) {
	    checkConversionForErrors(a, dtype);
	  }

	  if (noConversionNeeded(a, dtype)) {
	    return a;
	  }

	  if (dtype == null || dtype === 'float32' || dtype === 'complex64') {
	    return new Float32Array(a);
	  } else if (dtype === 'int32') {
	    return new Int32Array(a);
	  } else if (dtype === 'bool') {
	    var bool = new Uint8Array(a.length);

	    for (var i = 0; i < bool.length; ++i) {
	      if (Math.round(a[i]) !== 0) {
	        bool[i] = 1;
	      }
	    }

	    return bool;
	  } else {
	    throw new Error("Unknown data type " + dtype);
	  }
	}