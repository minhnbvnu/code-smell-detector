function gatherV2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      indices = inputs.indices;
	  var axis = attrs.axis,
	      batchDims = attrs.batchDims;
	  assertNotComplex([x, indices], 'gatherV2');
	  var $batchDims = batchDims;

	  if (batchDims == null) {
	    $batchDims = 0;
	  }

	  var indicesSize = sizeFromShape(indices.shape);
	  var parsedAxis = parseAxisParam(axis, x.shape)[0];
	  var shapeInfo = collectGatherOpShapeInfo(x, indices, parsedAxis, $batchDims);
	  var flattenX = reshape$2({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: [shapeInfo.batchSize, shapeInfo.outerSize, shapeInfo.dimSize, shapeInfo.sliceSize]
	    }
	  });
	  var flattenIndex = reshape$2({
	    inputs: {
	      x: indices
	    },
	    backend: backend,
	    attrs: {
	      shape: [shapeInfo.batchSize, indicesSize / shapeInfo.batchSize]
	    }
	  });
	  var flattenOutputShape = [shapeInfo.batchSize, shapeInfo.outerSize, indicesSize / shapeInfo.batchSize, shapeInfo.sliceSize];
	  var indicesBuf = backend.bufferSync(flattenIndex);
	  var xBuf = backend.bufferSync(flattenX);
	  var outBuf = gatherV2Impl(xBuf, indicesBuf, flattenOutputShape);
	  backend.disposeIntermediateTensorInfo(flattenX);
	  backend.disposeIntermediateTensorInfo(flattenIndex);
	  return backend.makeTensorInfo(shapeInfo.outputShape, outBuf.dtype, outBuf.values);
	}