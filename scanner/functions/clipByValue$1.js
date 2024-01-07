function clipByValue$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var clipValueMin = attrs.clipValueMin,
	      clipValueMax = attrs.clipValueMax;
	  var program;

	  if (env().getBool('WEBGL_PACK_CLIP')) {
	    program = new ClipPackedProgram(x.shape);
	  } else {
	    program = new ClipProgram(x.shape);
	  }

	  var customSetup = program.getCustomSetupFunc(clipValueMin, clipValueMax);
	  return backend.runWebGLProgram(program, [x], x.dtype, customSetup);
	}