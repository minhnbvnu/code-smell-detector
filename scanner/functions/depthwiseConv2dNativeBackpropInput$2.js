function depthwiseConv2dNativeBackpropInput$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      dilations = attrs.dilations,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode,
	      inputShape = attrs.inputShape;
	  var convInfo = computeConv2DInfo(inputShape, filter.shape, strides, dilations, pad, dimRoundingMode, true
	  /* depthwise */
	  );
	  var program = new DepthwiseConv2DDerInputProgram(convInfo);
	  return backend.runWebGLProgram(program, [dy, filter], 'float32');
	}