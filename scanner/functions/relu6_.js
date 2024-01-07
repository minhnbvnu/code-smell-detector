function relu6_(x) {
	  var $x = convertToTensor(x, 'x', 'relu6');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Relu6, inputs);
	}