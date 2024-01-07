function isInf_(x) {
	  var $x = convertToTensor(x, 'x', 'isInf');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(IsInf, inputs);
	}