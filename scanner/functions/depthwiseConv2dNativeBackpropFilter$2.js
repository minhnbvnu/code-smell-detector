function depthwiseConv2dNativeBackpropFilter$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      dy = inputs.dy;
	  var strides = attrs.strides,
	      dilations = attrs.dilations,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode,
	      filterShape = attrs.filterShape;
	  var convInfo = computeConv2DInfo(x.shape, filterShape, strides, dilations, pad, dimRoundingMode, true
	  /* depthwise */
	  );
	  var program = new DepthwiseConv2DDerFilterProgram(convInfo);
	  return backend.runWebGLProgram(program, [x, dy], 'float32');
	}