function ifft_(input) {
	  assert(input.dtype === 'complex64', function () {
	    return "The dtype for tf.spectral.ifft() must be complex64 " + ("but got " + input.dtype + ".");
	  });
	  var inputs = {
	    input: input
	  };
	  return ENGINE.runKernel(IFFT, inputs);
	}