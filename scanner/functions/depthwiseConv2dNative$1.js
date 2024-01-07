function depthwiseConv2dNative$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var $dilations = dilations;

	  if ($dilations == null) {
	    $dilations = [1, 1];
	  }

	  assert(eitherStridesOrDilationsAreOne(strides, $dilations), function () {
	    return 'Error in depthwiseConv2d: Either strides or dilations must be ' + ("1. Got strides " + strides + " and dilations '" + $dilations + "'");
	  });
	  var convInfo = computeConv2DInfo(x.shape, filter.shape, strides, $dilations, pad, dimRoundingMode, true
	  /* depthwise */
	  );
	  var program;

	  if (env().getBool('WEBGL_PACK_DEPTHWISECONV') && convInfo.strideWidth <= 2 && convInfo.outChannels / convInfo.inChannels === 1) {
	    program = new DepthwiseConvPacked2DProgram(convInfo);
	  } else {
	    program = new DepthwiseConv2DProgram(convInfo);
	  }

	  return backend.runWebGLProgram(program, [x, filter], 'float32');
	}