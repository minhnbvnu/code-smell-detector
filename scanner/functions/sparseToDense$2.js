function sparseToDense$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var sparseIndices = inputs.sparseIndices,
	      sparseValues = inputs.sparseValues,
	      defaultValue = inputs.defaultValue;
	  var outputShape = attrs.outputShape;

	  var _backend_util$calcula = calculateShapes(sparseValues, sparseIndices, outputShape),
	      sliceRank = _backend_util$calcula.sliceRank,
	      numUpdates = _backend_util$calcula.numUpdates,
	      strides = _backend_util$calcula.strides,
	      outputSize = _backend_util$calcula.outputSize;

	  var sumDupeIndices = false;
	  var program = new ScatterProgram(numUpdates, sliceRank, sparseIndices.shape.length, sparseValues.shape.length, strides, [outputSize, 1], sumDupeIndices);
	  var res = backend.runWebGLProgram(program, [sparseValues, sparseIndices, defaultValue], sparseValues.dtype);
	  var reshaped = reshape$3({
	    inputs: {
	      x: res
	    },
	    backend: backend,
	    attrs: {
	      shape: outputShape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(res);
	  return reshaped;
	}