function sqrt_(x) {
	  var $x = convertToTensor(x, 'x', 'sqrt');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Sqrt, inputs);
	}