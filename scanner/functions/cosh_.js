function cosh_(x) {
	  var $x = convertToTensor(x, 'x', 'cosh');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Cosh, inputs);
	}