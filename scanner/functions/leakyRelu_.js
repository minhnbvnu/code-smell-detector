function leakyRelu_(x, alpha) {
	  if (alpha === void 0) {
	    alpha = 0.2;
	  }

	  var $x = convertToTensor(x, 'x', 'leakyRelu');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    alpha: alpha
	  };
	  return ENGINE.runKernel(LeakyRelu, inputs, attrs);
	}