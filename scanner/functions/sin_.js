function sin_(x) {
	  var $x = convertToTensor(x, 'x', 'sin');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Sin, inputs);
	}