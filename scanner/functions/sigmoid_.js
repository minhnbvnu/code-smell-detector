function sigmoid_(x) {
	  var $x = convertToTensor(x, 'x', 'sigmoid');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Sigmoid, inputs);
	}