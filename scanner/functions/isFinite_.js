function isFinite_(x) {
	  var $x = convertToTensor(x, 'x', 'isFinite');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(IsFinite, inputs);
	}