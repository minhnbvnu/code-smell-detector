function maxPool3d$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var dilations = [1, 1, 1];
	  var convInfo = computePool3DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode, dataFormat);
	  var maxPoolProgram = new Pool3DProgram(convInfo, 'max', false);
	  return backend.runWebGLProgram(maxPoolProgram, [x], x.dtype);
	}