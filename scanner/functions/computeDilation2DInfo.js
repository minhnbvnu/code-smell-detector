function computeDilation2DInfo(inputShape, filterShape, strides, pad, dataFormat, dilations) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  // `computerConv2DInfo` require filterShape to be in the dimension of:
	  // `[filterHeight, filterWidth, depth, outDepth]`, dilation2d doesn't have
	  // outDepth, it should have the same depth as the input.
	  // Input shape: [batch, height, width, inChannels]
	  var inputChannels = inputShape[3];
	  var $filterShape = [].concat(filterShape, [inputChannels]);
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  return computeConv2DInfo(inputShape, $filterShape, strides, dilations, pad, null
	  /* roundingMode */
	  , null
	  /* depthWise */
	  , $dataFormat);
	}