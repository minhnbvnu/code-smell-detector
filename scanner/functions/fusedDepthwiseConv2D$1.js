function fusedDepthwiseConv2D$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter,
	      bias = inputs.bias,
	      preluActivationWeights = inputs.preluActivationWeights;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode,
	      activation = attrs.activation,
	      leakyreluAlpha = attrs.leakyreluAlpha;
	  var intermediates = [];
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
	  var shouldPackDepthwiseConv = env().getBool('WEBGL_PACK_DEPTHWISECONV') && convInfo.strideWidth <= 2 && convInfo.outChannels / convInfo.inChannels === 1;
	  var fusedActivation = activation ? mapActivationToShaderProgram(activation, shouldPackDepthwiseConv) : null;
	  var programInputs = [x, filter];
	  var hasBias = bias != null;
	  var hasPreluActivationWeights = preluActivationWeights != null;
	  var hasLeakyreluAlpha = activation === 'leakyrelu';

	  if (hasBias) {
	    programInputs.push(bias);
	  }

	  if (hasPreluActivationWeights) {
	    programInputs.push(preluActivationWeights);
	  }

	  if (hasLeakyreluAlpha) {
	    var $leakyreluAlpha = backend.makeTensorInfo([], 'float32', createScalarValue(leakyreluAlpha, 'float32'));
	    programInputs.push($leakyreluAlpha);
	    intermediates.push($leakyreluAlpha);
	  }

	  var program;

	  if (shouldPackDepthwiseConv) {
	    program = new DepthwiseConvPacked2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
	  } else {
	    program = new DepthwiseConv2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
	  }

	  var result = backend.runWebGLProgram(program, programInputs, 'float32');
	  intermediates.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return result;
	}