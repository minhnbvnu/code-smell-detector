function makeZerosTypedArray(size, dtype) {
	  if (dtype == null || dtype === 'float32' || dtype === 'complex64') {
	    return new Float32Array(size);
	  } else if (dtype === 'int32') {
	    return new Int32Array(size);
	  } else if (dtype === 'bool') {
	    return new Uint8Array(size);
	  } else {
	    throw new Error("Unknown data type " + dtype);
	  }
	}