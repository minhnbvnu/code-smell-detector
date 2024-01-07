function rand_(shape, randFunction, dtype) {
	  var size = sizeFromShape(shape);
	  var values = null;

	  if (dtype == null || dtype === 'float32') {
	    values = new Float32Array(size);
	  } else if (dtype === 'int32') {
	    values = new Int32Array(size);
	  } else if (dtype === 'bool') {
	    values = new Uint8Array(size);
	  } else {
	    throw new Error("Unknown data type " + dtype);
	  }

	  for (var i = 0; i < size; i++) {
	    values[i] = randFunction();
	  }

	  return ENGINE.makeTensor(values, shape, dtype);
	}