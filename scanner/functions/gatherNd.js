function gatherNd(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var params = inputs.params,
	      indices = inputs.indices;
	  var paramsSize = sizeFromShape(params.shape);
	  var indicesShape = indices.shape;
	  var sliceRank = indicesShape[indicesShape.length - 1];

	  var _backend_util$prepare = prepareAndValidate(params, indices),
	      resultShape = _backend_util$prepare[0],
	      numSlices = _backend_util$prepare[1],
	      sliceSize = _backend_util$prepare[2],
	      strides = _backend_util$prepare[3];

	  if (numSlices === 0) {
	    return backend.makeTensorInfo(resultShape, params.dtype, []);
	  }

	  var outBuf = buffer([numSlices, sliceSize], params.dtype);
	  var indicesData = backend.data.get(indices.dataId).values;
	  var paramsData = backend.data.get(params.dataId).values;

	  for (var i = 0; i < numSlices; i++) {
	    var index = [];
	    var flattenIndex = 0;

	    for (var j = 0; j < sliceRank; j++) {
	      var dim = indicesData[i * sliceRank + j];
	      flattenIndex += dim * strides[j];
	      index.push(dim);
	    }

	    if (flattenIndex < 0 || flattenIndex >= paramsSize / sliceSize) {
	      throw new Error("Invalid indices: " + index + " does not index into " + params.shape);
	    }

	    for (var k = 0; k < sliceSize; k++) {
	      outBuf.values[i * sliceSize + k] = paramsData[flattenIndex * sliceSize + k];
	    }
	  }

	  return backend.makeTensorInfo(resultShape, outBuf.dtype, outBuf.values);
	}