function max_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  var $x = convertToTensor(x, 'x', 'max');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    reductionIndices: axis,
	    keepDims: keepDims
	  };
	  return ENGINE.runKernel(Max, inputs, attrs);
	}