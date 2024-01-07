function tensor(values, shape, dtype) {
	  var inferredShape = inferShape(values, dtype);
	  return makeTensor(values, shape, inferredShape, dtype);
	}