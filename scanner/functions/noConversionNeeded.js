function noConversionNeeded(a, dtype) {
	  return a instanceof Float32Array && dtype === 'float32' || a instanceof Int32Array && dtype === 'int32' || a instanceof Uint8Array && dtype === 'bool';
	}