function isIterable$1(obj) {
	  return obj != null && !ArrayBuffer.isView(obj) && (Array.isArray(obj) || typeof obj === 'object' && !(obj instanceof Tensor));
	}