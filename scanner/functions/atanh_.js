function atanh_(x) {
	  var $x = convertToTensor(x, 'x', 'atanh');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Atanh, inputs);
	}