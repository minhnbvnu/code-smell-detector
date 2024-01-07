function unaryKernelFuncFromImpl(name, unaryImpl, dtype) {
	  return function (_ref2) {
	    var inputs = _ref2.inputs,
	        attrs = _ref2.attrs,
	        backend = _ref2.backend;
	    var x = inputs.x;
	    assertNotComplex(x, name);

	    if (x.dtype === 'string' || dtype === 'string') {
	      throw new Error('unaryKernelFunc does not support string input/output');
	    }

	    var cpuBackend = backend;
	    var values = cpuBackend.data.get(x.dataId).values;
	    var $dtype = dtype || x.dtype;
	    var newValues = unaryImpl(values, $dtype, attrs);
	    return cpuBackend.makeTensorInfo(x.shape, $dtype, newValues);
	  };
	}