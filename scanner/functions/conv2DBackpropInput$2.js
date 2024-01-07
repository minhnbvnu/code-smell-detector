function conv2DBackpropInput$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      filter = inputs.filter;
	  var inputShape = attrs.inputShape,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(inputShape, filter.shape, strides, 1
	  /* dilations */
	  , pad, dimRoundingMode, false, $dataFormat);
	  var program = new Conv2DDerInputProgram(convInfo);
	  return backend.runWebGLProgram(program, [dy, filter], 'float32');
	}