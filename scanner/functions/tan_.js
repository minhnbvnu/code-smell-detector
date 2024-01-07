function tan_(x) {
	  var $x = convertToTensor(x, 'x', 'tan');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Tan, inputs);
	}