function fusedDepthwiseConv2d_(_ref) {
	  var x = _ref.x,
	      filter = _ref.filter,
	      strides = _ref.strides,
	      pad = _ref.pad,
	      _ref$dataFormat = _ref.dataFormat,
	      dataFormat = _ref$dataFormat === void 0 ? 'NHWC' : _ref$dataFormat,
	      _ref$dilations = _ref.dilations,
	      dilations = _ref$dilations === void 0 ? [1, 1] : _ref$dilations,
	      dimRoundingMode = _ref.dimRoundingMode,
	      bias = _ref.bias,
	      _ref$activation = _ref.activation,
	      activation = _ref$activation === void 0 ? 'linear' : _ref$activation,
	      preluActivationWeights = _ref.preluActivationWeights,
	      leakyreluAlpha = _ref.leakyreluAlpha;

	  if (shouldFuse(ENGINE.state.gradientDepth, activation) === false) {
	    var result = depthwiseConv2d(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode);

	    if (bias != null) {
	      result = add$1(result, bias);
	    }

	    return applyActivation(result, activation, preluActivationWeights, leakyreluAlpha);
	  }

	  var $x = convertToTensor(x, 'x', 'depthwiseConv2d');
	  var $filter = convertToTensor(filter, 'filter', 'depthwiseConv2d');
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in fused depthwiseConv2d: input must be rank 4, but got " + ("rank " + x4D.rank + ".");
	  });
	  assert($filter.rank === 4, function () {
	    return "Error in fused depthwiseConv2d: filter must be rank 4, " + ("but got rank " + $filter.rank + ".");
	  });
	  assert(x4D.shape[3] === $filter.shape[2], function () {
	    return "Error in fused depthwiseConv2d: number of input channels " + ("(" + x4D.shape[3] + ") must match the inChannels dimension in ") + ("filter " + $filter.shape[2] + ".");
	  });

	  if (dilations == null) {
	    dilations = [1, 1];
	  }

	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in fused depthwiseConv2d: Either strides or dilations must ' + ("be 1. Got strides " + strides + " and dilations '" + dilations + "'");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in fused depthwiseConv2d: pad must be an integer when " + ("using dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var convInfo = computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad, dimRoundingMode, true
	  /* depthwise */
	  );
	  var $bias;

	  if (bias != null) {
	    $bias = convertToTensor(bias, 'bias', 'fused conv2d');

	    var _makeTypesMatch = makeTypesMatch($bias, $x);

	    $bias = _makeTypesMatch[0];
	    assertAndGetBroadcastShape(convInfo.outShape, $bias.shape);
	  }

	  var $preluActivationWeights;

	  if (preluActivationWeights != null) {
	    $preluActivationWeights = convertToTensor(preluActivationWeights, 'prelu weights', 'fused depthwiseConv2d');
	  }

	  var grad = function grad(dy, saved) {
	    assert(tupleValuesAreOne(dilations), function () {
	      return 'Error in gradient of fused depthwiseConv2d: dilation rates ' + "greater than 1 are not yet supported. Got dilations " + ("'" + dilations + "'");
	    });
	    var $filter = saved[0],
	        x4D = saved[1],
	        y = saved[2],
	        bias = saved[3];
	    var dyActivation = getFusedDyActivation(dy, y, activation);
	    var xDer = depthwiseConv2dNativeBackpropInput(x4D.shape, dyActivation, $filter, strides, pad, dilations, dimRoundingMode);
	    var filterDer = depthwiseConv2dNativeBackpropFilter(x4D, dyActivation, $filter.shape, strides, pad, dilations, dimRoundingMode);

	    if (bias != null) {
	      var biasDer = getFusedBiasGradient($bias, dyActivation);
	      return [xDer, filterDer, biasDer];
	    }

	    return [xDer, filterDer];
	  };

	  var inputs = {
	    x: x4D,
	    filter: $filter,
	    bias: $bias,
	    preluActivationWeights: $preluActivationWeights
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dataFormat: dataFormat,
	    dilations: dilations,
	    dimRoundingMode: dimRoundingMode,
	    activation: activation,
	    leakyreluAlpha: leakyreluAlpha
	  }; // Depending on the the params passed in we will have different number of
	  // inputs and thus a a different number of elements in the gradient.

	  if (bias == null) {
	    var customOp = customGrad(function (x4D, filter, save) {
	      // tslint:disable-next-line: no-unnecessary-type-assertion
	      var res = ENGINE.runKernel(FusedDepthwiseConv2D, inputs, attrs);
	      save([filter, x4D, res]);

	      if (reshapedTo4D) {
	        // tslint:disable-next-line: no-unnecessary-type-assertion
	        res = reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	      }

	      return {
	        value: res,
	        gradFunc: grad
	      };
	    });
	    return customOp(x4D, $filter);
	  } else {
	    var customOpWithBias = customGrad(function (x4D, filter, bias, save) {
	      // tslint:disable-next-line: no-unnecessary-type-assertion
	      var res = ENGINE.runKernel(FusedDepthwiseConv2D, inputs, attrs);
	      save([filter, x4D, res, bias]);

	      if (reshapedTo4D) {
	        // tslint:disable-next-line: no-unnecessary-type-assertion
	        res = reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	      }

	      return {
	        value: res,
	        gradFunc: grad
	      };
	    });
	    return customOpWithBias(x4D, $filter, $bias);
	  }
	}