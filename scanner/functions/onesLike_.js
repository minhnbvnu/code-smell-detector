function onesLike_(x) {
	  var $x = convertToTensor(x, 'x', 'onesLike');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(OnesLike, inputs);
	}