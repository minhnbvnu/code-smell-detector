function makeZerosNestedTypedArray(shape, dtype) {
	  var size = shape.reduce(function (prev, curr) {
	    return prev * curr;
	  }, 1);

	  if (dtype == null || dtype === 'float32') {
	    return toNestedArray(shape, new Float32Array(size));
	  } else if (dtype === 'int32') {
	    return toNestedArray(shape, new Int32Array(size));
	  } else if (dtype === 'bool') {
	    return toNestedArray(shape, new Uint8Array(size));
	  } else {
	    throw new Error("Unknown data type " + dtype);
	  }
	}