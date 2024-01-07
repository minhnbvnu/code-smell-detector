function round_(x) {
	  var $x = convertToTensor(x, 'x', 'round');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Round, inputs);
	}