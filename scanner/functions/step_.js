function step_(x, alpha) {
	  if (alpha === void 0) {
	    alpha = 0.0;
	  }

	  var $x = convertToTensor(x, 'x', 'step');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    alpha: alpha
	  };
	  return ENGINE.runKernel(Step, inputs, attrs);
	}