function transposeImpl$1(x, perm, backend) {
	  var program = env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ? new TransposePackedProgram(x.shape, perm) : new TransposeProgram(x.shape, perm);
	  return backend.runWebGLProgram(program, [x], x.dtype);
	}