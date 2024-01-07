function tanh_(x) {
	  var $x = convertToTensor(x, 'x', 'tanh');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Tanh, inputs);
	}