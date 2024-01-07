function calculateShapes(updates, indices, shape) {
	  // Calculate the number of dimensions in indices
	  var indicesRank = indices.shape.length;
	  var sliceRank = indicesRank > 1 ? indices.shape[indicesRank - 1] : 1; // Calculate the number of elements that make up each slice of our updated
	  // tensor. This allows us to work with flattened tensors and copy over whole
	  // slices at a time.

	  var totalNd = shape.length;
	  var sliceSize = 1;

	  for (var i = sliceRank; i < totalNd; ++i) {
	    sliceSize *= shape[i];
	  }

	  var safeSliceDim = sliceRank < 1 ? 1 : sliceRank;
	  var numUpdates = sizeFromShape(indices.shape) / safeSliceDim;
	  var strides = [].concat(computeStrides(shape.slice(0, sliceRank)), [1]);
	  var outputSize = sizeFromShape(shape);
	  return {
	    sliceRank: sliceRank,
	    numUpdates: numUpdates,
	    sliceSize: sliceSize,
	    strides: strides,
	    outputSize: outputSize
	  };
	}