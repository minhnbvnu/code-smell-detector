function sparseToDense$1(args) {
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
	      sliceSize = _backend_util$calcula.sliceSize,
	      strides = _backend_util$calcula.strides,
	      outputSize = _backend_util$calcula.outputSize;

	  var sumDupeIndices = false;
	  var indicesBuf = backend.bufferSync(sparseIndices);
	  var updatesBuf = backend.bufferSync(sparseValues);
	  var $defaultValue = backend.data.get(defaultValue.dataId).values[0];
	  var outBuf = scatterImpl(indicesBuf, updatesBuf, outputShape, outputSize, sliceSize, numUpdates, sliceRank, strides, $defaultValue, sumDupeIndices);
	  return backend.makeTensorInfo(outputShape, outBuf.dtype, outBuf.values);
	}