function zeros$2(backend, shape, dtype) {
	  if (dtype === void 0) {
	    dtype = 'float32';
	  }

	  if (dtype === 'complex64') {
	    var real = zeros$2(backend, shape, 'float32');
	    var imag = zeros$2(backend, shape, 'float32');
	    return complex$1({
	      inputs: {
	        real: real,
	        imag: imag
	      },
	      backend: backend
	    });
	  }

	  var values = makeZerosTypedArray(sizeFromShape(shape), dtype);
	  return backend.makeTensorInfo(shape, dtype, values);
	}