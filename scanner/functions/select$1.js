function select$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var condition = inputs.condition,
	      t = inputs.t,
	      e = inputs.e;
	  var program = new SelectProgram(condition.shape.length, t.shape, t.shape.length);
	  return backend.runWebGLProgram(program, [condition, t, e], upcastType(t.dtype, e.dtype));
	}