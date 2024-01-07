function expm1_(x) {
	  var $x = convertToTensor(x, 'x', 'expm1');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Expm1, inputs);
	}