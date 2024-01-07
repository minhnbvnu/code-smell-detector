function reciprocal_(x) {
	  var $x = convertToTensor(x, 'x', 'reciprocal');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Reciprocal, inputs);
	}