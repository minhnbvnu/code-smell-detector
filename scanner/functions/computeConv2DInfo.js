function computeConv2DInfo(inShape, filterShape, strides, dilations, pad, roundingMode, depthwise, dataFormat) {
	  if (depthwise === void 0) {
	    depthwise = false;
	  }

	  if (dataFormat === void 0) {
	    dataFormat = 'channelsLast';
	  }

	  var batchSize = -1,
	      inHeight = -1,
	      inWidth = -1,
	      inChannels = -1;

	  if (dataFormat === 'channelsLast') {
	    batchSize = inShape[0];
	    inHeight = inShape[1];
	    inWidth = inShape[2];
	    inChannels = inShape[3];
	  } else if (dataFormat === 'channelsFirst') {
	    batchSize = inShape[0];
	    inChannels = inShape[1];
	    inHeight = inShape[2];
	    inWidth = inShape[3];
	  } else {
	    throw new Error("Unknown dataFormat " + dataFormat);
	  }

	  var filterHeight = filterShape[0],
	      filterWidth = filterShape[1],
	      filterChannels = filterShape[3];

	  var _parseTupleParam2 = parseTupleParam(strides),
	      strideHeight = _parseTupleParam2[0],
	      strideWidth = _parseTupleParam2[1];

	  var _parseTupleParam3 = parseTupleParam(dilations),
	      dilationHeight = _parseTupleParam3[0],
	      dilationWidth = _parseTupleParam3[1];

	  var effectiveFilterHeight = getEffectiveFilterSize(filterHeight, dilationHeight);
	  var effectiveFilterWidth = getEffectiveFilterSize(filterWidth, dilationWidth);

	  var _getPadAndOutInfo = getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, effectiveFilterHeight, effectiveFilterWidth, roundingMode, dataFormat),
	      padInfo = _getPadAndOutInfo.padInfo,
	      outHeight = _getPadAndOutInfo.outHeight,
	      outWidth = _getPadAndOutInfo.outWidth;

	  var outChannels = depthwise ? filterChannels * inChannels : filterChannels;
	  var outShape;

	  if (dataFormat === 'channelsFirst') {
	    outShape = [batchSize, outChannels, outHeight, outWidth];
	  } else if (dataFormat === 'channelsLast') {
	    outShape = [batchSize, outHeight, outWidth, outChannels];
	  }

	  return {
	    batchSize: batchSize,
	    dataFormat: dataFormat,
	    inHeight: inHeight,
	    inWidth: inWidth,
	    inChannels: inChannels,
	    outHeight: outHeight,
	    outWidth: outWidth,
	    outChannels: outChannels,
	    padInfo: padInfo,
	    strideHeight: strideHeight,
	    strideWidth: strideWidth,
	    filterHeight: filterHeight,
	    filterWidth: filterWidth,
	    effectiveFilterHeight: effectiveFilterHeight,
	    effectiveFilterWidth: effectiveFilterWidth,
	    dilationHeight: dilationHeight,
	    dilationWidth: dilationWidth,
	    inShape: inShape,
	    outShape: outShape,
	    filterShape: filterShape
	  };
	}