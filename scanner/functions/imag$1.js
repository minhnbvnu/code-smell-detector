function imag$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var input = inputs.input;
	  var imag = backend.data.get(input.dataId).complexTensorInfos.imag;
	  var imagVal = backend.data.get(imag.dataId).values; // When complex tensor is disposed, its underlying parts will be disposed too.
	  // Make new tensor out of the imag value of the complex. This makes sure the
	  // value is still accessible even if complex tensor is disposed.

	  return backend.makeTensorInfo(imag.shape, imag.dtype, imagVal);
	}