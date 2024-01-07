function conv3DBackpropInput$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      filter = inputs.filter;
	  var pad = attrs.pad,
	      strides = attrs.strides,
	      inputShape = attrs.inputShape;
	  var convInfo = computeConv3DInfo(inputShape, filter.shape, strides, 1
	  /* dilations */
	  , pad);
	  var program = new Conv3DDerInputProgram(convInfo);
	  return backend.runWebGLProgram(program, [dy, filter], 'float32');
	}