function abs$a(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x; // TODO: handle cases when x is complex. Once the cpu implementation
	  // can handle complex values, refactor to use unaryKernelFunc.

	  if (backend.shouldExecuteOnCPU([x]) && x.dtype !== 'complex64') {
	    var xData = backend.texData.get(x.dataId);
	    var outValues = simpleAbsImplCPU(xData.values);
	    return backend.makeTensorInfo(x.shape, x.dtype, outValues);
	  }

	  var program;

	  if (env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
	    program = new UnaryOpPackedProgram(x.shape, ABS$1);
	  } else {
	    program = new UnaryOpProgram(x.shape, ABS$1);
	  }

	  return backend.runWebGLProgram(program, [x], x.dtype);
	}