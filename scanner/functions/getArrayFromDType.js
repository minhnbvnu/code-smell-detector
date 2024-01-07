function getArrayFromDType(dtype, size) {
	  var values = null;

	  if (dtype == null || dtype === 'float32') {
	    values = new Float32Array(size);
	  } else if (dtype === 'int32') {
	    values = new Int32Array(size);
	  } else if (dtype === 'bool') {
	    values = new Uint8Array(size);
	  } else if (dtype === 'string') {
	    values = new Array(size);
	  } else {
	    throw new Error("Unknown data type " + dtype);
	  }

	  return values;
	}