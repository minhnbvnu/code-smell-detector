function scatterImpl(indices, updates, shape, outputSize, sliceSize, numUpdates, sliceRank, strides, defaultValue, sumDupeIndices) {
	  var flattenShape = [outputSize / sliceSize, sliceSize];
	  var indicesData = indices.values;
	  var updatesData = updates.values;

	  if (outputSize === 0) {
	    return buffer(shape, updates.dtype);
	  }

	  var outBuf = buffer(flattenShape, updates.dtype);
	  outBuf.values.fill(defaultValue);

	  for (var i = 0; i < numUpdates; i++) {
	    var index = [];
	    var flattenIndex = 0;

	    for (var j = 0; j < sliceRank; j++) {
	      var dim = indicesData[i * sliceRank + j];
	      index.push(dim);
	      flattenIndex += dim * strides[j];
	    }

	    if (flattenIndex < 0 || flattenIndex >= outputSize / sliceSize) {
	      throw new Error("Invalid indices: " + index + " does not index into " + shape);
	    }

	    for (var k = 0; k < sliceSize; k++) {
	      if (sumDupeIndices) {
	        outBuf.values[flattenIndex * sliceSize + k] += updatesData[i * sliceSize + k];
	      } else {
	        outBuf.values[flattenIndex * sliceSize + k] = updates.rank === 0 ? updatesData[0] : updatesData[i * sliceSize + k];
	      }
	    }
	  }

	  return outBuf;
	}