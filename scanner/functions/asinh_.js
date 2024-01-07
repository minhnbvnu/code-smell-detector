function asinh_(x) {
	  var $x = convertToTensor(x, 'x', 'asinh');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Asinh, inputs);
	}