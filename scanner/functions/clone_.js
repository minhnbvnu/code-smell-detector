function clone_(x) {
	  var $x = convertToTensor(x, 'x', 'clone', 'string_or_numeric');
	  var inputs = {
	    x: $x
	  }; // Note this op is called tf.identity in python. Hence the kernel name used
	  // here.

	  return ENGINE.runKernel(Identity, inputs);
	}