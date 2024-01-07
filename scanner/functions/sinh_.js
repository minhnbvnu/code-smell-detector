function sinh_(x) {
	  var $x = convertToTensor(x, 'x', 'sinh');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Sinh, inputs);
	}