function canTensorify(obj) {
	  return obj == null || isPrimitive(obj) || Array.isArray(obj) || typeof obj === 'object' && obj instanceof Tensor || isTypedArray$1(obj);
	}