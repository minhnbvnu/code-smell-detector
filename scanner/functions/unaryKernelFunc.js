function unaryKernelFunc(name, op, dtype) {
	  return function (_ref) {
	    var inputs = _ref.inputs,
	        attrs = _ref.attrs,
	        backend = _ref.backend;
	    var x = inputs.x;
	    assertNotComplex(x, name);

	    if (x.dtype === 'string' || dtype === 'string') {
	      throw new Error('unaryKernelFunc does not support string input/output');
	    }

	    var cpuBackend = backend;
	    var values = cpuBackend.data.get(x.dataId).values;
	    var xSize = sizeFromShape(x.shape);
	    var $dtype = dtype || x.dtype;
	    var newValues = getArrayFromDType($dtype, xSize);

	    for (var i = 0; i < xSize; ++i) {
	      newValues[i] = op(values[i], attrs);
	    }

	    return cpuBackend.makeTensorInfo(x.shape, $dtype, newValues);
	  };
	}