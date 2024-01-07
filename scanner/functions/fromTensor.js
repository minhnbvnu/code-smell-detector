function fromTensor(tensor, elementShape, elementDtype) {
	  var dtype = tensor.dtype;

	  if (tensor.shape.length < 1) {
	    throw new Error("Tensor must be at least a vector, but saw shape: " + tensor.shape);
	  }

	  if (tensor.dtype !== elementDtype) {
	    throw new Error("Invalid data types; op elements " + tensor.dtype + ", but list elements " + elementDtype);
	  }

	  var outputShape = tensor.shape.slice(1);
	  assertShapesMatchAllowUndefinedSize(outputShape, elementShape, 'TensorList shape mismatch: ');
	  var tensorList = unstack(tensor);
	  return new TensorList(tensorList, elementShape, dtype);
	}