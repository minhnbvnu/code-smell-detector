function denseBincount$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      weights = inputs.weights;
	  var size = attrs.size,
	      binaryOutput = attrs.binaryOutput;

	  if (x.shape.length === 1) {
	    var xVals = backend.data.get(x.dataId).values;
	    var weightsVals = backend.data.get(weights.dataId).values;
	    var outVals = bincountImpl(xVals, weightsVals, weights.dtype, weights.shape, size);
	    return backend.makeTensorInfo([size], weights.dtype, outVals);
	  } else if (x.shape.length === 2) {
	    var xBuf = backend.bufferSync(x);
	    var weightsBuf = backend.bufferSync(weights);
	    var outBuf = bincountReduceImpl(xBuf, weightsBuf, size, binaryOutput);
	    return backend.makeTensorInfo(outBuf.shape, weights.dtype, outBuf.values);
	  }

	  throw new Error("Error in denseBincount: input must be at most rank 2, but got rank" + (x.shape.length + "."));
	}