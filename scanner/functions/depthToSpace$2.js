function depthToSpace$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var blockSize = attrs.blockSize,
	      dataFormat = attrs.dataFormat;
	  assert(blockSize > 1, function () {
	    return "blockSize should be > 1 for depthToSpace, but was: " + blockSize;
	  });
	  var batchSize = x.shape[0];
	  var inputHeight = dataFormat === 'NHWC' ? x.shape[1] : x.shape[2];
	  var inputWidth = dataFormat === 'NHWC' ? x.shape[2] : x.shape[3];
	  var inputDepth = dataFormat === 'NHWC' ? x.shape[3] : x.shape[1];
	  var outputHeight = inputHeight * blockSize;
	  var outputWidth = inputWidth * blockSize;
	  var outputDepth = inputDepth / (blockSize * blockSize);
	  var outputShape = dataFormat === 'NHWC' ? [batchSize, outputHeight, outputWidth, outputDepth] : [batchSize, outputDepth, outputHeight, outputWidth];
	  var program = new DepthToSpaceProgram(outputShape, blockSize, dataFormat);
	  return backend.runWebGLProgram(program, [x], x.dtype);
	}