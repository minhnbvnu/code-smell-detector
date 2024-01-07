function denseBincount$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      weights = inputs.weights;
	  var size = attrs.size,
	      binaryOutput = attrs.binaryOutput;

	  if (x.shape.length === 1) {
	    var xVals = backend.readSync(x.dataId);
	    var weightsVals = backend.readSync(weights.dataId);
	    var outVals = bincountImplCPU(xVals, weightsVals, weights.dtype, weights.shape, size);
	    return backend.makeTensorInfo([size], weights.dtype, outVals);
	  } else if (x.shape.length === 2) {
	    var xBuf = backend.bufferSync(x);
	    var weightsBuf = backend.bufferSync(weights);
	    var outBuf = bincountReduceImplCPU(xBuf, weightsBuf, size, binaryOutput);
	    return backend.makeTensorInfo(outBuf.shape, weights.dtype, outBuf.values);
	  }

	  throw new Error("Error in denseBincount: input must be at most rank 2, but got rank" + (x.shape.length + "."));
	}