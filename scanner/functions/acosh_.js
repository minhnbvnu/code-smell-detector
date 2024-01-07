function acosh_(x) {
	  var $x = convertToTensor(x, 'x', 'acosh');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Acosh, inputs);
	}