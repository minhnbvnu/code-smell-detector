function validateUpdateShape(shape, indices, updates) {
	  var sliceDim = indices.rank > 1 ? indices.shape[indices.rank - 1] : 1;
	  var batchDim = indices.rank > 1 ? indices.rank - 1 : 1;
	  var shapeError = 'Must have updates.shape = indices.shape[:batchDim] + ' + ("shape[sliceDim:], got updates.shape: " + updates.shape) + (", indices.shape: " + indices.shape + ", shape: " + shape) + (", sliceDim: " + sliceDim + ", and batchDim: " + batchDim + ".");

	  if (updates.rank < batchDim) {
	    throw new Error(shapeError + (" update.rank < " + batchDim + ". "));
	  }

	  if (shape.length < sliceDim + (updates.rank - batchDim)) {
	    throw new Error(shapeError + (" Output shape length < " + (sliceDim + (updates.rank - batchDim))));
	  }

	  if (updates.rank !== batchDim + shape.length - sliceDim) {
	    throw new Error(shapeError + (" update.rank != " + (batchDim + shape.length - sliceDim)));
	  }

	  for (var d = 0; d < batchDim; ++d) {
	    if (updates.shape[d] !== indices.shape[d]) {
	      throw new Error(shapeError + (" updates.shape[" + d + "] (" + updates.shape[d] + ") != indices.shape[" + d + "] (" + indices.shape[d] + ")."));
	    }
	  }

	  for (var _d = 0; _d < updates.rank - batchDim; ++_d) {
	    if (updates.shape[_d + batchDim] !== shape[_d + sliceDim]) {
	      throw new Error(shapeError + (" updates.shape[" + (_d + batchDim) + "] (" + updates.shape[_d + batchDim] + ") != shape[" + (_d + batchDim) + "] (" + shape[_d + batchDim] + ")"));
	    }
	  }
	}