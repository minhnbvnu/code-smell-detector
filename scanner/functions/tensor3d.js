function tensor3d(values, shape, dtype) {
	  assertNonNull(values);

	  if (shape != null && shape.length !== 3) {
	    throw new Error('tensor3d() requires shape to have three numbers');
	  }

	  var inferredShape = inferShape(values, dtype);

	  if (inferredShape.length !== 3 && inferredShape.length !== 1) {
	    throw new Error('tensor3d() requires values to be number[][][] or flat/TypedArray');
	  }

	  if (inferredShape.length === 1 && shape == null) {
	    throw new Error('tensor3d() requires shape to be provided when `values` ' + 'are a flat array');
	  }

	  return makeTensor(values, shape, inferredShape, dtype);
	}