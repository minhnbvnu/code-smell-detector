function gatherV2$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      indices = inputs.indices;
	  var axis = attrs.axis,
	      batchDims = attrs.batchDims;
	  var parsedAxis = parseAxisParam(axis, x.shape)[0];
	  var shapeInfo = collectGatherOpShapeInfo(x, indices, parsedAxis, batchDims);
	  var indicesSize = sizeFromShape(indices.shape);
	  var toDispose = [];
	  var flattenX = reshape$3({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: [shapeInfo.batchSize, shapeInfo.outerSize, shapeInfo.dimSize, shapeInfo.sliceSize]
	    }
	  });
	  var flattenIndex = reshape$3({
	    inputs: {
	      x: indices
	    },
	    backend: backend,
	    attrs: {
	      shape: [shapeInfo.batchSize, indicesSize / shapeInfo.batchSize]
	    }
	  });
	  toDispose.push(flattenX);
	  toDispose.push(flattenIndex);
	  var flattenOutputShape = [shapeInfo.batchSize, shapeInfo.outerSize, indicesSize / shapeInfo.batchSize, shapeInfo.sliceSize];

	  if (backend.shouldExecuteOnCPU([x, indices]) || x.dtype === 'string') {
	    var indicesBuf = backend.bufferSync(flattenIndex);
	    var xBuf = backend.bufferSync(flattenX);
	    var outBuf = gatherV2ImplCPU(xBuf, indicesBuf, flattenOutputShape);
	    toDispose.forEach(function (t) {
	      return backend.disposeIntermediateTensorInfo(t);
	    });
	    return backend.makeTensorInfo(shapeInfo.outputShape, outBuf.dtype, outBuf.values);
	  }

	  var program = new GatherProgram(flattenX.shape, flattenOutputShape);
	  var res = backend.runWebGLProgram(program, [flattenX, flattenIndex], flattenX.dtype);
	  toDispose.push(res);
	  var reshaped = reshape$3({
	    inputs: {
	      x: res
	    },
	    backend: backend,
	    attrs: {
	      shape: shapeInfo.outputShape
	    }
	  });
	  toDispose.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return reshaped;
	}