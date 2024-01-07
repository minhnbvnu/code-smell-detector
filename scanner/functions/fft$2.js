function fft$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var input = inputs.input;
	  return fftImpl$1(input, false
	  /* inverse */
	  , backend);
	}