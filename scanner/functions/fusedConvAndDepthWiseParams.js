function fusedConvAndDepthWiseParams(node, tensorMap, context) {
	  var _getParamValue = getParamValue('fusedOps', node, tensorMap, context),
	      extraOp = _getParamValue[0],
	      activationFunc = _getParamValue[1];

	  var isBiasAdd = extraOp === 'biasadd';
	  var isPrelu = activationFunc === 'prelu';
	  var isBatchNorm = extraOp === 'fusedbatchnorm';
	  var numArgs = getParamValue('numArgs', node, tensorMap, context);

	  if (isBiasAdd) {
	    if (isPrelu && numArgs !== 2) {
	      throw new Error('FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu ' + 'must have two extra arguments: bias and alpha.');
	    }

	    if (!isPrelu && numArgs !== 1) {
	      throw new Error('FusedConv2d and DepthwiseConv2d with BiasAdd must have ' + 'one extra argument: bias.');
	    }
	  }

	  if (isBatchNorm) {
	    throw new Error('FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported.');
	  }

	  var stride = getParamValue('strides', node, tensorMap, context);
	  var pad = getPadding(node, tensorMap, context);
	  var dataFormat = getParamValue('dataFormat', node, tensorMap, context).toUpperCase();
	  var dilations = getParamValue('dilations', node, tensorMap, context);

	  var _getParamValue2 = getParamValue('args', node, tensorMap, context),
	      biasArg = _getParamValue2[0],
	      preluArg = _getParamValue2[1];

	  var leakyreluAlpha = getParamValue('leakyreluAlpha', node, tensorMap, context);
	  return {
	    stride: stride,
	    pad: pad,
	    dataFormat: dataFormat,
	    dilations: dilations,
	    biasArg: biasArg,
	    preluArg: preluArg,
	    activationFunc: activationFunc,
	    leakyreluAlpha: leakyreluAlpha
	  };
	}