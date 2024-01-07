function real$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var input = inputs.input;
	  var real = backend.data.get(input.dataId).complexTensorInfos.real;
	  var realVal = backend.data.get(real.dataId).values; // When complex tensor is disposed, its underlying parts will be disposed too.
	  // Make new tensor out of the real value of the complex. This makes sure the
	  // value is still accessible even if complex tensor is disposed.

	  return backend.makeTensorInfo(real.shape, real.dtype, realVal);
	}