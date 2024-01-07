function cos_(x) {
	  var $x = convertToTensor(x, 'x', 'cos');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Cos, inputs);
	}