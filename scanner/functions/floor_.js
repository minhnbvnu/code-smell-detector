function floor_(x) {
	  var $x = convertToTensor(x, 'x', 'floor');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Floor, inputs);
	}