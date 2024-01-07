function complex_(real, imag) {
	  var $real = convertToTensor(real, 'real', 'complex');
	  var $imag = convertToTensor(imag, 'imag', 'complex');
	  assertShapesMatch($real.shape, $imag.shape, "real and imag shapes, " + $real.shape + " and " + $imag.shape + ", " + "must match in call to tf.complex().");
	  var inputs = {
	    real: $real,
	    imag: $imag
	  };
	  return ENGINE.runKernel(Complex, inputs);
	}