function conv2DBackpropFilter$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      dy = inputs.dy;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dimRoundingMode = attrs.dimRoundingMode,
	      filterShape = attrs.filterShape;
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(x.shape, filterShape, strides, 1
	  /* dilations */
	  , pad, dimRoundingMode, false
	  /* depthwise */
	  , $dataFormat);
	  var program = new Conv2DDerFilterProgram(convInfo);
	  return backend.runWebGLProgram(program, [x, dy], 'float32');
	}