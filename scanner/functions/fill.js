function fill(shape, value, dtype) {
	  var attrs = {
	    shape: shape,
	    value: value,
	    dtype: dtype
	  };
	  return ENGINE.runKernel(Fill, {}, attrs);
	}