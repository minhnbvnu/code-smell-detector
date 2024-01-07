function isNaN_(x) {
	  var $x = convertToTensor(x, 'x', 'isNaN');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(IsNan, inputs);
	}