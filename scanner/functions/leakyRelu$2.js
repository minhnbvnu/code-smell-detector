function leakyRelu$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var alpha = attrs.alpha;
	  var $alpha = backend.makeTensorInfo([], 'float32', createScalarValue(alpha, 'float32'));
	  var program = env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ? new BinaryOpPackedProgram(LEAKYRELU_PACKED, x.shape, $alpha.shape) : new BinaryOpProgram(LEAKYRELU, x.shape, $alpha.shape);
	  var result = backend.runWebGLProgram(program, [x, $alpha], x.dtype);
	  backend.disposeIntermediateTensorInfo($alpha);
	  return result;
	}