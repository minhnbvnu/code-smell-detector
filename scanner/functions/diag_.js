function diag_(x) {
	  var $x = convertToTensor(x, 'x', 'diag');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Diag, inputs);
	}