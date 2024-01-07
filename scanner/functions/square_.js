function square_(x) {
	  var $x = convertToTensor(x, 'x', 'square');
	  var attrs = {};
	  return ENGINE.runKernel('Square', {
	    x: $x
	  }, attrs);
	}