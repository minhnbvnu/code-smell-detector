function bincount$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      weights = inputs.weights;
	  var size = attrs.size;
	  var xVals = backend.readSync(x.dataId);
	  var weightsVals = backend.readSync(weights.dataId);
	  var outVals = bincountImplCPU(xVals, weightsVals, weights.dtype, weights.shape, size);
	  return backend.makeTensorInfo([size], weights.dtype, outVals);
	}