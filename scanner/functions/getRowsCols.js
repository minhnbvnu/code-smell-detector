function getRowsCols(shape) {
	  if (shape.length === 0) {
	    throw Error('Cannot get rows and columns of an empty shape array.');
	  }

	  return [shape.length > 1 ? shape[shape.length - 2] : 1, shape[shape.length - 1]];
	}