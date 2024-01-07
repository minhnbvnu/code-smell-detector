function prelu_(x, alpha) {
	  var $x = convertToTensor(x, 'x', 'prelu');
	  var $alpha = convertToTensor(alpha, 'alpha', 'prelu');
	  var inputs = {
	    x: $x,
	    alpha: $alpha
	  };
	  return ENGINE.runKernel(Prelu, inputs);
	}