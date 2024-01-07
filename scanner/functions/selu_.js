function selu_(x) {
	  var $x = convertToTensor(x, 'x', 'selu');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Selu, inputs);
	}