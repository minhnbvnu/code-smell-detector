function atan_(x) {
	  var $x = convertToTensor(x, 'x', 'atan');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Atan, inputs);
	}