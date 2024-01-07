function ifft$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var input = inputs.input;
	  var inputSize = sizeFromShape(input.shape); // Collapse all outer dimensions to a single batch dimension.

	  var innerDimensionSize = input.shape[input.shape.length - 1];
	  var batch = inputSize / innerDimensionSize;
	  var input2D = reshape$2({
	    inputs: {
	      x: input
	    },
	    backend: backend,
	    attrs: {
	      shape: [batch, innerDimensionSize]
	    }
	  });
	  var result = fftBatch(input2D, true, backend);
	  var resultReshaped = reshape$2({
	    inputs: {
	      x: result
	    },
	    backend: backend,
	    attrs: {
	      shape: input.shape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(input2D);
	  backend.disposeIntermediateTensorInfo(result);
	  return resultReshaped;
	}