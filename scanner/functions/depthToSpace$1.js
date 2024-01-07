function depthToSpace$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var blockSize = attrs.blockSize,
	      dataFormat = attrs.dataFormat;
	  assert(dataFormat === 'NHWC', function () {
	    return "Only NHWC dataFormat supported on CPU for depthToSpace. Got " + dataFormat;
	  });
	  assert(blockSize > 1, function () {
	    return "blockSize should be > 1 for depthToSpace, but was: " + blockSize;
	  });
	  var batchSize = x.shape[0];
	  var inputHeight = x.shape[1];
	  var inputWidth = x.shape[2];
	  var inputDepth = x.shape[3];
	  var outputHeight = inputHeight * blockSize;
	  var outputWidth = inputWidth * blockSize;
	  var outputDepth = inputDepth / (blockSize * blockSize);
	  var xValues = backend.data.get(x.dataId).values;
	  var result = new Float32Array(batchSize * outputHeight * outputWidth * outputDepth);
	  var outputIdx = 0;

	  for (var b = 0; b < batchSize; ++b) {
	    for (var h = 0; h < outputHeight; ++h) {
	      var inH = Math.floor(h / blockSize);
	      var offsetH = h % blockSize;

	      for (var w = 0; w < outputWidth; ++w) {
	        var inW = Math.floor(w / blockSize);
	        var offsetW = w % blockSize;
	        var offsetD = (offsetH * blockSize + offsetW) * outputDepth;

	        for (var d = 0; d < outputDepth; ++d) {
	          var inD = d + offsetD;
	          var inputIdx = inD + inputDepth * (inW + inputWidth * (inH + inputHeight * b));
	          result[outputIdx++] = xValues[inputIdx];
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo([batchSize, outputHeight, outputWidth, outputDepth], x.dtype, result);
	}