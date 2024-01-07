function min_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  var $x = convertToTensor(x, 'x', 'min');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis,
	    keepDims: keepDims
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(Min, inputs, attrs);
	}