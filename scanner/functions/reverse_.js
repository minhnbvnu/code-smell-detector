function reverse_(x, axis) {
	  var $x = convertToTensor(x, 'x', 'reverse');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    dims: axis
	  };
	  return ENGINE.runKernel(Reverse, inputs, attrs);
	}