function fusedConv2d(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter,
	      bias = inputs.bias,
	      preluActivationWeights = inputs.preluActivationWeights;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode,
	      activation = attrs.activation,
	      leakyreluAlpha = attrs.leakyreluAlpha;
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(x.shape, filter.shape, strides, dilations, pad, dimRoundingMode, false
	  /* depthwise */
	  , $dataFormat);
	  var out;
	  var intermediates = [];

	  if (convInfo.filterHeight === 1 && convInfo.filterWidth === 1 && convInfo.dilationHeight === 1 && convInfo.dilationWidth === 1 && convInfo.strideHeight === 1 && convInfo.strideWidth === 1 && (convInfo.padInfo.type === 'SAME' || convInfo.padInfo.type === 'VALID')) {
	    out = conv2dByMatMul({
	      x: x,
	      filter: filter,
	      convInfo: convInfo,
	      backend: backend,
	      bias: bias,
	      activation: activation,
	      preluActivationWeights: preluActivationWeights,
	      leakyreluAlpha: leakyreluAlpha
	    });
	  } else if (env().getBool('WEBGL_CONV_IM2COL') && x.shape[0] === 1) {
	    out = conv2dWithIm2Row({
	      x: x,
	      filter: filter,
	      convInfo: convInfo,
	      backend: backend,
	      bias: bias,
	      activation: activation,
	      preluActivationWeights: preluActivationWeights,
	      leakyreluAlpha: leakyreluAlpha
	    });
	  } else {
	    var hasBias = bias != null;
	    var hasPreluActivationWeights = preluActivationWeights != null;
	    var hasLeakyreluAlpha = activation === 'leakyrelu';
	    var fusedActivation = activation ? mapActivationToShaderProgram(activation, false) : null;
	    var program = new Conv2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
	    var _inputs = [x, filter];

	    if (bias) {
	      _inputs.push(bias);
	    }

	    if (preluActivationWeights) {
	      _inputs.push(preluActivationWeights);
	    }

	    if (hasLeakyreluAlpha) {
	      var $leakyreluAlpha = backend.makeTensorInfo([], 'float32', createScalarValue(leakyreluAlpha, 'float32'));

	      _inputs.push($leakyreluAlpha);

	      intermediates.push($leakyreluAlpha);
	    }

	    out = backend.runWebGLProgram(program, _inputs, 'float32');
	  }

	  var outReshaped = reshape$3({
	    inputs: {
	      x: out
	    },
	    backend: backend,
	    attrs: {
	      shape: convInfo.outShape
	    }
	  });
	  intermediates.push(out);
	  intermediates.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return outReshaped;
	}