function toNestedArray(shape, a) {
	  if (shape.length === 0) {
	    // Scalar type should return a single number.
	    return a[0];
	  }

	  var size = shape.reduce(function (acc, c) {
	    return acc * c;
	  });

	  if (size === 0) {
	    // A tensor with shape zero should be turned into empty list.
	    return [];
	  }

	  if (size !== a.length) {
	    throw new Error("[" + shape + "] does not match the input size " + a.length + ".");
	  }

	  return createNestedArray(0, shape, a);
	}