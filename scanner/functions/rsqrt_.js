function rsqrt_(x) {
	  var $x = convertToTensor(x, 'x', 'rsqrt');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Rsqrt, inputs);
	}