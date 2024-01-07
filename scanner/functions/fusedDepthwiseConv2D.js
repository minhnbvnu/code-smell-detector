function fusedDepthwiseConv2D(args) {
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
	  var result = depthwiseConv2dNative({
	    inputs: {
	      x: x,
	      filter: filter
	    },
	    backend: backend,
	    attrs: {
	      strides: strides,
	      pad: pad,
	      dataFormat: dataFormat,
	      dilations: dilations,
	      dimRoundingMode: dimRoundingMode
	    }
	  });

	  if (bias) {
	    var oldResult = result;
	    result = add$4({
	      inputs: {
	        a: result,
	        b: bias
	      },
	      backend: backend
	    });
	    backend.disposeIntermediateTensorInfo(oldResult);
	  }

	  if (activation) {
	    var _oldResult = result;
	    result = applyActivation$1(backend, result, activation, preluActivationWeights, leakyreluAlpha);
	    backend.disposeIntermediateTensorInfo(_oldResult);
	  }

	  return result;
	}