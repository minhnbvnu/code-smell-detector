function fusedConv2d_(_ref) {
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
	  activation = activation || 'linear';

	  if (shouldFuse(ENGINE.state.gradientDepth, activation) === false) {
	    var result = conv2d(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode);

	    if (bias != null) {
	      result = add$1(result, bias);
	    }

	    return applyActivation(result, activation, preluActivationWeights, leakyreluAlpha);
	  }

	  var $x = convertToTensor(x, 'x', 'conv2d');
	  var $filter = convertToTensor(filter, 'filter', 'conv2d');
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in fused conv2d: input must be rank 4, but got rank " + (x4D.rank + ".");
	  });
	  assert($filter.rank === 4, function () {
	    return "Error in fused conv2d: filter must be rank 4, but got rank " + ($filter.rank + ".");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in fused conv2d: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  assert(x4D.shape[3] === $filter.shape[2], function () {
	    return "Error in conv2d: depth of input (" + x4D.shape[3] + ") must match " + ("input depth for filter " + $filter.shape[2] + ".");
	  });
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in conv2D: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  assert(dataFormat === 'NHWC', function () {
	    return "Error in conv2d: got dataFormat of " + dataFormat + " but only NHWC is currently supported.";
	  });
	  var convInfo = computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad, dimRoundingMode);
	  var $bias;

	  if (bias != null) {
	    $bias = convertToTensor(bias, 'bias', 'fused conv2d');

	    var _makeTypesMatch = makeTypesMatch($bias, $x);

	    $bias = _makeTypesMatch[0];
	    assertAndGetBroadcastShape(convInfo.outShape, $bias.shape);
	  }

	  var $preluActivationWeights;

	  if (preluActivationWeights != null) {
	    $preluActivationWeights = convertToTensor(preluActivationWeights, 'prelu weights', 'fused conv2d');
	  }

	  var grad = function grad(dy, saved) {
	    var $filter = saved[0],
	        x4D = saved[1],
	        y = saved[2],
	        $bias = saved[3];
	    var dyActivation = getFusedDyActivation(dy, y, activation);
	    assert(tupleValuesAreOne(dilations), function () {
	      return 'Error in gradient of fused conv2D: ' + "dilation rates greater than 1 " + ("are not yet supported in gradients. Got dilations '" + dilations + "'");
	    });
	    var xDer = conv2DBackpropInput(x4D.shape, dyActivation, $filter, strides, pad);
	    var filterDer = conv2DBackpropFilter(x4D, dyActivation, $filter.shape, strides, pad);
	    var der = [xDer, filterDer];

	    if ($bias != null) {
	      var biasDer = getFusedBiasGradient($bias, dyActivation);
	      der.push(biasDer);
	    }

	    return der;
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
	      var res = // tslint:disable-next-line: no-unnecessary-type-assertion
	      ENGINE.runKernel(FusedConv2D, inputs, attrs);
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
	      var res = ENGINE.runKernel(FusedConv2D, inputs, attrs);
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