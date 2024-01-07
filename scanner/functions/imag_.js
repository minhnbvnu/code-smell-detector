function imag_(input) {
	  var $input = convertToTensor(input, 'input', 'imag');
	  var inputs = {
	    input: $input
	  };
	  return ENGINE.runKernel(Imag, inputs);
	}