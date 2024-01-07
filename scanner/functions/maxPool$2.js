function maxPool$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  assertNotComplex$1(x, 'maxPool');
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var dilations = 1;
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in maxPool: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  var convInfo = computePool2DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode);

	  if (convInfo.filterWidth === 1 && convInfo.filterHeight === 1 && arraysEqual(convInfo.inShape, convInfo.outShape)) {
	    return identity$2({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  }

	  var maxPoolProgram = new Pool2DProgram(convInfo, 'max', false);
	  return backend.runWebGLProgram(maxPoolProgram, [x], x.dtype);
	}