function all_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  var $x = convertToTensor(x, 'x', 'all', 'bool');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis,
	    keepDims: keepDims
	  };
	  return ENGINE.runKernel(All, inputs, attrs);
	}