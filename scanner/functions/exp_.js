function exp_(x) {
	  var $x = convertToTensor(x, 'x', 'exp');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Exp, inputs);
	}