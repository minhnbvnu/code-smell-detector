function scalar(value, dtype) {
	  if ((isTypedArray$1(value) && dtype !== 'string' || Array.isArray(value)) && dtype !== 'complex64') {
	    throw new Error('Error creating a new Scalar: value must be a primitive ' + '(number|boolean|string)');
	  }

	  if (dtype === 'string' && isTypedArray$1(value) && !(value instanceof Uint8Array)) {
	    throw new Error('When making a scalar from encoded string, ' + 'the value must be `Uint8Array`.');
	  }

	  var shape = [];
	  var inferredShape = [];
	  return makeTensor(value, shape, inferredShape, dtype);
	}