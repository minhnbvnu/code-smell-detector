function neg_(x) {
	  var $x = convertToTensor(x, 'x', 'neg');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Neg, inputs);
	}