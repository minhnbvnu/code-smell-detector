function log_(x) {
	  var $x = convertToTensor(x, 'x', 'log');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Log, inputs);
	}