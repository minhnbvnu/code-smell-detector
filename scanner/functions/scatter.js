function scatter(tensor, indices, elementShape, numElements) {
	  if (indices.length !== tensor.shape[0]) {
	    throw new Error("Expected len(indices) == tensor.shape[0], but saw: " + indices.length + " vs. " + tensor.shape[0]);
	  }

	  var maxIndex = Math.max.apply(Math, indices);

	  if (numElements != null && numElements !== -1 && maxIndex >= numElements) {
	    throw new Error("Max index must be < array size (" + maxIndex + "  vs. " + numElements + ")");
	  }

	  var list = new TensorList([], elementShape, tensor.dtype, numElements);
	  var tensors = unstack(tensor, 0);
	  indices.forEach(function (value, index) {
	    list.setItem(value, tensors[index]);
	  });
	  return list;
	}