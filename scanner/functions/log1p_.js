function log1p_(x) {
	  var $x = convertToTensor(x, 'x', 'log1p');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Log1p, inputs);
	}