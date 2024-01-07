function tensor1d(values, dtype) {
	  assertNonNull(values);
	  var inferredShape = inferShape(values, dtype);

	  if (inferredShape.length !== 1) {
	    throw new Error('tensor1d() requires values to be a flat/TypedArray');
	  }

	  var shape = null;
	  return makeTensor(values, shape, inferredShape, dtype);
	}