function int(input, backend) {
	  var program = new UnaryOpProgram(input.shape, TO_INT);
	  var output = backend.runWebGLProgram(program, [input], 'int32');
	  return {
	    dataId: output.dataId,
	    shape: output.shape,
	    dtype: output.dtype
	  };
	}