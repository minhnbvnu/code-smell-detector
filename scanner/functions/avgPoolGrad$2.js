function avgPoolGrad$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      input = inputs.input;
	  var x = input;
	  assertNotComplex$1([dy, input], 'avgPoolGrad');
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad;
	  var convInfo = computePool2DInfo(x.shape, filterSize, strides, 1
	  /* dilations */
	  , pad);
	  var avgPoolBackpropProgram = new AvgPool2DBackpropProgram(convInfo);
	  return backend.runWebGLProgram(avgPoolBackpropProgram, [dy], x.dtype);
	}