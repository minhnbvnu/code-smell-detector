function zerosLike_(x) {
	  var $x = convertToTensor(x, 'x', 'zerosLike');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(ZerosLike, inputs);
	}