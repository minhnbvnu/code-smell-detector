function ceil_(x) {
	  var $x = convertToTensor(x, 'x', 'ceil');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Ceil, inputs);
	}