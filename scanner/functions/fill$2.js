function fill$2(args) {
	  var backend = args.backend,
	      attrs = args.attrs;
	  var shape = attrs.shape,
	      value = attrs.value;
	  var dtype = attrs.dtype;
	  dtype = dtype || inferDtype(value);

	  if (dtype === 'string') {
	    // String type should be handled in CPU memory.
	    var values = getArrayFromDType(dtype, sizeFromShape(shape));
	    values.fill(value);
	    return backend.makeTensorInfo(shape, dtype, values);
	  } else {
	    var program = new FillProgram(shape, value);
	    var customSetup = program.getCustomSetupFunc(value);
	    return backend.runWebGLProgram(program, [], dtype, customSetup);
	  }
	}