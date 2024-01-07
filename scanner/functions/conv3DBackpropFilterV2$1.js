function conv3DBackpropFilterV2$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      dy = inputs.dy;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      filterShape = attrs.filterShape;
	  var convInfo = computeConv3DInfo(x.shape, filterShape, strides, 1
	  /* dilations */
	  , pad);
	  var program = new Conv3DDerFilterProgram(convInfo);
	  return backend.runWebGLProgram(program, [x, dy], 'float32');
	}