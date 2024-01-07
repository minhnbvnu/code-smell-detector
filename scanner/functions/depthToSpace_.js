function depthToSpace_(x, blockSize, dataFormat) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  var $x = convertToTensor(x, 'x', 'depthToSpace');
	  var inputHeight = dataFormat === 'NHWC' ? $x.shape[1] : $x.shape[2];
	  var inputWidth = dataFormat === 'NHWC' ? $x.shape[2] : $x.shape[3];
	  var inputDepth = dataFormat === 'NHWC' ? $x.shape[3] : $x.shape[1];
	  assert(inputHeight * blockSize >= 0, function () {
	    return "Negative dimension size caused by overflow when multiplying\n    " + inputHeight + " and " + blockSize + "  for depthToSpace with input shape\n    " + $x.shape;
	  });
	  assert(inputWidth * blockSize >= 0, function () {
	    return "Negative dimension size caused by overflow when multiplying\n    " + inputWidth + " and " + blockSize + " for depthToSpace with input shape\n        " + $x.shape;
	  });
	  assert(inputDepth % (blockSize * blockSize) === 0, function () {
	    return "Dimension size must be evenly divisible by " + blockSize * blockSize + " but is " + inputDepth + " for depthToSpace with input shape " + $x.shape;
	  });
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    blockSize: blockSize,
	    dataFormat: dataFormat
	  };
	  return ENGINE.runKernel(DepthToSpace, inputs, attrs);
	}