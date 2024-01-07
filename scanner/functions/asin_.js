function asin_(x) {
	  var $x = convertToTensor(x, 'x', 'asin');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Asin, inputs);
	}