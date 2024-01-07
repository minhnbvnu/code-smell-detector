function relu_(x) {
	  var $x = convertToTensor(x, 'x', 'relu');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Relu, inputs);
	}