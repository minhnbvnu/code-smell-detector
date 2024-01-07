function scatterNd(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var indices = inputs.indices,
	      updates = inputs.updates;
	  var shape = attrs.shape;

	  var _backend_util$calcula = calculateShapes(updates, indices, shape),
	      sliceRank = _backend_util$calcula.sliceRank,
	      numUpdates = _backend_util$calcula.numUpdates,
	      sliceSize = _backend_util$calcula.sliceSize,
	      strides = _backend_util$calcula.strides,
	      outputSize = _backend_util$calcula.outputSize;

	  var sumDupeIndices = true;
	  var indicesBuf = backend.bufferSync(indices);
	  var updatesBuf = backend.bufferSync(updates);
	  var outBuf = scatterImpl(indicesBuf, updatesBuf, shape, outputSize, sliceSize, numUpdates, sliceRank, strides, 0
	  /* defaultValue */
	  , sumDupeIndices);
	  return backend.makeTensorInfo(shape, outBuf.dtype, outBuf.values);
	}