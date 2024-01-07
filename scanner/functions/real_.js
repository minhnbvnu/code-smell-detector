function real_(input) {
	  var $input = convertToTensor(input, 'input', 'real');
	  var inputs = {
	    input: $input
	  };
	  return ENGINE.runKernel(Real, inputs);
	}