function softplus_(x) {
	  var $x = convertToTensor(x, 'x', 'softplus');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Softplus, inputs);
	}