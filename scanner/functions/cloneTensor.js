function cloneTensor(tensor) {
	  return tensor.kept ? tensor : clone(tensor);
	}