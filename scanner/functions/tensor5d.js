function tensor5d(values, shape, dtype) {
	  assertNonNull(values);

	  if (shape != null && shape.length !== 5) {
	    throw new Error('tensor5d() requires shape to have five numbers');
	  }

	  var inferredShape = inferShape(values, dtype);

	  if (inferredShape.length !== 5 && inferredShape.length !== 1) {
	    throw new Error('tensor5d() requires values to be ' + 'number[][][][][] or flat/TypedArray');
	  }

	  if (inferredShape.length === 1 && shape == null) {
	    throw new Error('tensor5d() requires shape to be provided when `values` ' + 'are a flat array');
	  }

	  return makeTensor(values, shape, inferredShape, dtype);
	}