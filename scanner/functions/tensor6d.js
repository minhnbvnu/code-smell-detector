function tensor6d(values, shape, dtype) {
	  assertNonNull(values);

	  if (shape != null && shape.length !== 6) {
	    throw new Error('tensor6d() requires shape to have six numbers');
	  }

	  var inferredShape = inferShape(values, dtype);

	  if (inferredShape.length !== 6 && inferredShape.length !== 1) {
	    throw new Error('tensor6d() requires values to be number[][][][][][] or ' + 'flat/TypedArray');
	  }

	  if (inferredShape.length === 1 && shape == null) {
	    throw new Error('tensor6d() requires shape to be provided when `values` ' + 'are a flat array');
	  }

	  shape = shape || inferredShape;
	  return makeTensor(values, shape, inferredShape, dtype);
	}