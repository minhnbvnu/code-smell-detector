function tensor2d(values, shape, dtype) {
	  assertNonNull(values);

	  if (shape != null && shape.length !== 2) {
	    throw new Error('tensor2d() requires shape to have two numbers');
	  }

	  var inferredShape = inferShape(values, dtype);

	  if (inferredShape.length !== 2 && inferredShape.length !== 1) {
	    throw new Error('tensor2d() requires values to be number[][] or flat/TypedArray');
	  }

	  if (inferredShape.length === 1 && shape == null) {
	    throw new Error('tensor2d() requires shape to be provided when `values` ' + 'are a flat/TypedArray');
	  }

	  return makeTensor(values, shape, inferredShape, dtype);
	}