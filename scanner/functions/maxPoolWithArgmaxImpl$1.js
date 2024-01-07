function maxPoolWithArgmaxImpl$1(x, includeBatchInIndex, convInfo, backend) {
	  var program = new Pool2DProgram(convInfo, 'max', false);
	  var poolOutput = backend.runWebGLProgram(program, [x], 'float32');
	  program = new Pool2DProgram(convInfo, 'max', true, true, includeBatchInIndex);
	  var indexOutput = backend.runWebGLProgram(program, [x], 'float32');
	  return [poolOutput, indexOutput];
	}