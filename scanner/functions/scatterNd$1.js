function scatterNd$1(args) {
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

	  var flattenShape = [outputSize / sliceSize, sliceSize];

	  if (outputSize === 0) {
	    return backend.makeTensorInfo(shape, indices.dtype);
	  }

	  var flattenIndices = reshape$3({
	    inputs: {
	      x: indices
	    },
	    backend: backend,
	    attrs: {
	      shape: [numUpdates, sliceRank]
	    }
	  });
	  var flattenX = reshape$3({
	    inputs: {
	      x: updates
	    },
	    backend: backend,
	    attrs: {
	      shape: [numUpdates, sliceSize]
	    }
	  });
	  var defaultValue = backend.makeTensorInfo([], 'float32', new Float32Array([0])); // scalar(0)

	  var program = new ScatterProgram(numUpdates, sliceRank, flattenIndices.shape.length, flattenX.shape.length, strides, flattenShape);
	  var res = backend.runWebGLProgram(program, [flattenX, flattenIndices, defaultValue], flattenX.dtype);
	  var reshaped = reshape$3({
	    inputs: {
	      x: res
	    },
	    backend: backend,
	    attrs: {
	      shape: shape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(flattenIndices);
	  backend.disposeIntermediateTensorInfo(flattenX);
	  backend.disposeIntermediateTensorInfo(res);
	  backend.disposeIntermediateTensorInfo(defaultValue);
	  return reshaped;
	}