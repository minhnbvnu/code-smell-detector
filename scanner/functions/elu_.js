function elu_(x) {
	  var $x = convertToTensor(x, 'x', 'elu');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Elu, inputs);
	}