function prelu$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x,
	      alpha = inputs.alpha;
	  var program = env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ? new BinaryOpPackedProgram(PRELU_PACKED, x.shape, alpha.shape) : new BinaryOpProgram(PRELU, x.shape, alpha.shape);
	  return backend.runWebGLProgram(program, [x, alpha], x.dtype);
	}