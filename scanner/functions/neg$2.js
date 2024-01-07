function neg$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;

	  if (backend.shouldExecuteOnCPU([x])) {
	    var xData = backend.texData.get(x.dataId);

	    var _negImplCPU = negImplCPU(xData.values, x.shape, x.dtype),
	        outValues = _negImplCPU[0],
	        newShape = _negImplCPU[1];

	    return backend.makeTensorInfo(newShape, x.dtype, outValues);
	  }

	  var program;

	  if (env().getBool('WEBGL_PACK_UNARY_OPERATIONS')) {
	    program = new UnaryOpPackedProgram(x.shape, NEG);
	  } else {
	    program = new UnaryOpProgram(x.shape, NEG);
	  }

	  return backend.runWebGLProgram(program, [x], x.dtype);
	}