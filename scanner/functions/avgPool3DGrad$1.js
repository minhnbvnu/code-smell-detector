function avgPool3DGrad$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      input = inputs.input;
	  var x = input;
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var dilations = [1, 1, 1];
	  var convInfo = computePool3DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode);
	  var avgPoolBackpropProgram = new AvgPool3DBackpropProgram(convInfo);
	  return backend.runWebGLProgram(avgPoolBackpropProgram, [dy], x.dtype);
	}