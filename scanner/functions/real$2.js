function real$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var input = inputs.input;
	  var inputData = backend.texData.get(input.dataId);
	  return identity$2({
	    inputs: {
	      x: inputData.complexTensorInfos.real
	    },
	    backend: backend
	  });
	}