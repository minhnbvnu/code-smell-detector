function deepClone(container) {
	  return deepMap(container, cloneIfTensor);
	}