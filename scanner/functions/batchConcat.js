function batchConcat(arrays) {
	  if (arrays.length === 0) {
	    // We can't return an empty Tensor because we don't know the element shape.
	    throw new Error('Can\'t make a batch of zero elements.');
	  }

	  if (arrays[0] instanceof Tensor) {
	    // Input is an array of Tensors
	    return stack(arrays);
	  } else {
	    // Input is a possibly-nested array of numbers.
	    return tensor(arrays);
	  }
	}