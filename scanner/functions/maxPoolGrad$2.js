function maxPoolGrad$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      input = inputs.input,
	      output = inputs.output;
	  var x = input;
	  assertNotComplex$1([input, output], 'maxPoolGrad');
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var convInfo = computePool2DInfo(x.shape, filterSize, strides, 1
	  /* dilations */
	  , pad, dimRoundingMode);
	  var getPositions = true;
	  var maxPoolPositionsProgram = new Pool2DProgram(convInfo, 'max', getPositions);
	  var maxPoolPositions = backend.runWebGLProgram(maxPoolPositionsProgram, [x], x.dtype);
	  var maxPoolBackPropProgram = new MaxPool2DBackpropProgram(convInfo);
	  var result = backend.runWebGLProgram(maxPoolBackPropProgram, [dy, maxPoolPositions], x.dtype);
	  backend.disposeIntermediateTensorInfo(maxPoolPositions);
	  return result;
	}