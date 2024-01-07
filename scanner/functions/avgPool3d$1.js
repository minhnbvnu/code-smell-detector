function avgPool3D$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode,
	      dataFormat = attrs.dataFormat;
	  var dilations = [1, 1, 1];
	  var convInfo = computePool3DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode, dataFormat);
	  var avgPoolProgram = new Pool3DProgram(convInfo, 'avg', false);
	  return backend.runWebGLProgram(avgPoolProgram, [x], 'float32');
	}