function toArray1D(array) {
	  array = Array.isArray(array) ? new Float32Array(array) : array;
	  return tensor1d(array);
	}