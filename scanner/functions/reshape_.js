function reshape_(x, shape) {
	  var $x = convertToTensor(x, 'x', 'reshape', 'string_or_numeric');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    shape: shape
	  };
	  return ENGINE.runKernel(Reshape, inputs, attrs);
	}