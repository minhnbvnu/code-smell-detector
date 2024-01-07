function reverse$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var dims = attrs.dims;
	  var xRank = x.shape.length;
	  var $dims = parseAxisParam(dims, x.shape);

	  if (xRank === 0) {
	    return identity$2({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  }

	  var program = env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ? new ReversePackedProgram(x.shape, $dims) : new ReverseProgram(x.shape, $dims);
	  return backend.runWebGLProgram(program, [x], x.dtype);
	}