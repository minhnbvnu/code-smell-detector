function conv3D$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations;
	  var convInfo = computeConv3DInfo(x.shape, filter.shape, strides, dilations, pad);
	  var program = new Conv3DProgram(convInfo);
	  return backend.runWebGLProgram(program, [x, filter], 'float32');
	}