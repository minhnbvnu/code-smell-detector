function argMin_(x, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'argMin');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis
	  };
	  return ENGINE.runKernel(ArgMin, inputs, attrs);
	}