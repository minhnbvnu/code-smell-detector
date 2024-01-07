function bincount$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      weights = inputs.weights;
	  var size = attrs.size;
	  var xVals = backend.data.get(x.dataId).values;
	  var weightsVals = backend.data.get(weights.dataId).values;
	  var outVals = bincountImpl(xVals, weightsVals, weights.dtype, weights.shape, size);
	  return backend.makeTensorInfo([size], weights.dtype, outVals);
	}