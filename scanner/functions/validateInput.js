function validateInput(updates, indices, shape) {
	  if (indices.rank < 1) {
	    throw new Error('tf.scatterND() expects the indices to be rank 1 or higher,' + (" but the rank was " + indices.rank + "."));
	  }

	  if (updates.rank < 1) {
	    throw new Error('tf.scatterND() expects the updates to be rank 1 or higher,' + (" but the rank was " + updates.rank + "."));
	  }

	  if (indices.dtype !== 'int32') {
	    throw new Error("The dtype of 'indices' should be int32, but got dtype: " + indices.dtype);
	  }

	  if (shape.length < 1) {
	    throw new Error("Output rank must be greater or equal to 1, but got shape: " + shape);
	  }

	  if (shape.length === 0) {
	    if (indices.size === 0) {
	      throw new Error("Indices specified for empty output. indices shape: " + indices.shape);
	    }

	    if (updates.size === 0) {
	      throw new Error("Updates specified for empty output. updates shape: " + updates.shape);
	    }
	  }

	  validateUpdateShape(shape, indices, updates);
	}