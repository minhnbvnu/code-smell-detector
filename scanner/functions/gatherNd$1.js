function gatherNd$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var params = inputs.params,
	      indices = inputs.indices;
	  var indicesShape = indices.shape;
	  var sliceRank = indicesShape[indicesShape.length - 1];

	  var _backend_util$prepare = prepareAndValidate(params, indices),
	      resultShape = _backend_util$prepare[0],
	      numSlices = _backend_util$prepare[1],
	      sliceSize = _backend_util$prepare[2],
	      strides = _backend_util$prepare[3];

	  var flattenIndices = reshape$3({
	    inputs: {
	      x: indices
	    },
	    backend: backend,
	    attrs: {
	      shape: [numSlices, sliceRank]
	    }
	  });
	  var flattenX = reshape$3({
	    inputs: {
	      x: params
	    },
	    backend: backend,
	    attrs: {
	      shape: [sizeFromShape(params.shape) / sliceSize, sliceSize]
	    }
	  });
	  var program = new GatherNDProgram(sliceRank, strides, [numSlices, sliceSize]);
	  var res = backend.runWebGLProgram(program, [flattenX, flattenIndices], flattenX.dtype);
	  var reshaped = reshape$3({
	    inputs: {
	      x: res
	    },
	    backend: backend,
	    attrs: {
	      shape: resultShape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(flattenIndices);
	  backend.disposeIntermediateTensorInfo(flattenX);
	  backend.disposeIntermediateTensorInfo(res);
	  return reshaped;
	}