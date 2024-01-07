function ones$1(shape, dtype) {
	  if (dtype === void 0) {
	    dtype = 'float32';
	  }

	  if (dtype === 'complex64') {
	    var real = ones$1(shape, 'float32');
	    var imag = zeros(shape, 'float32');
	    return complex(real, imag);
	  }

	  var values = makeOnesTypedArray(sizeFromShape(shape), dtype);
	  return ENGINE.makeTensor(values, shape, dtype);
	}