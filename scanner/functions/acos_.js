function acos_(x) {
	  var $x = convertToTensor(x, 'x', 'acos');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Acos, inputs);
	}