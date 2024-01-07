function maxPool3DGrad$1(args) {
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
	  var maxPool3dPositionsProgram = new Pool3DProgram(convInfo, 'max', true
	  /* get positions */
	  );
	  var maxPool3dPositions = backend.runWebGLProgram(maxPool3dPositionsProgram, [x], x.dtype);
	  var maxPoolBackpropProgram = new MaxPool3DBackpropProgram(convInfo);
	  var result = backend.runWebGLProgram(maxPoolBackpropProgram, [dy, maxPool3dPositions], x.dtype);
	  backend.disposeIntermediateTensorInfo(maxPool3dPositions);
	  return result;
	}