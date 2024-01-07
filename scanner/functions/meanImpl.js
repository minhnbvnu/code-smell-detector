function meanImpl(x, reduceShape, outShape, backend) {
	  var inSize = sizeFromShape(reduceShape);
	  var xSize = sizeFromShape(x.shape);
	  var batchSize = xSize / inSize;
	  var reshapedInput = reshape$3({
	    inputs: {
	      x: x
	    },
	    attrs: {
	      shape: [batchSize, inSize]
	    },
	    backend: backend
	  });
	  var reduced = reduce(reshapedInput, 'float32', 'mean', backend);
	  var reshapedOutput = reshape$3({
	    inputs: {
	      x: reduced
	    },
	    attrs: {
	      shape: outShape
	    },
	    backend: backend
	  });
	  backend.disposeIntermediateTensorInfo(reshapedInput);
	  backend.disposeIntermediateTensorInfo(reduced);
	  return reshapedOutput;
	}