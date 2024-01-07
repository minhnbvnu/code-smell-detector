function mean_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  var $x = convertToTensor(x, 'x', 'mean');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis,
	    keepDims: keepDims
	  };
	  return ENGINE.runKernel(Mean, inputs, attrs);
	}