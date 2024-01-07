function computeConv3DInfo(inShape, filterShape, strides, dilations, pad, depthwise, dataFormat, roundingMode) {
	  if (depthwise === void 0) {
	    depthwise = false;
	  }

	  if (dataFormat === void 0) {
	    dataFormat = 'channelsLast';
	  }

	  var batchSize = -1,
	      inDepth = -1,
	      inHeight = -1,
	      inWidth = -1,
	      inChannels = -1;

	  if (dataFormat === 'channelsLast') {
	    batchSize = inShape[0];
	    inDepth = inShape[1];
	    inHeight = inShape[2];
	    inWidth = inShape[3];
	    inChannels = inShape[4];
	  } else if (dataFormat === 'channelsFirst') {
	    batchSize = inShape[0];
	    inChannels = inShape[1];
	    inDepth = inShape[2];
	    inHeight = inShape[3];
	    inWidth = inShape[4];
	  } else {
	    throw new Error("Unknown dataFormat " + dataFormat);
	  }

	  var filterDepth = filterShape[0],
	      filterHeight = filterShape[1],
	      filterWidth = filterShape[2],
	      filterChannels = filterShape[4];

	  var _parse3TupleParam2 = parse3TupleParam(strides),
	      strideDepth = _parse3TupleParam2[0],
	      strideHeight = _parse3TupleParam2[1],
	      strideWidth = _parse3TupleParam2[2];

	  var _parse3TupleParam3 = parse3TupleParam(dilations),
	      dilationDepth = _parse3TupleParam3[0],
	      dilationHeight = _parse3TupleParam3[1],
	      dilationWidth = _parse3TupleParam3[2];

	  var effectiveFilterDepth = getEffectiveFilterSize(filterDepth, dilationDepth);
	  var effectiveFilterHeight = getEffectiveFilterSize(filterHeight, dilationHeight);
	  var effectiveFilterWidth = getEffectiveFilterSize(filterWidth, dilationWidth);

	  var _get3DPadAndOutInfo = get3DPadAndOutInfo(pad, inDepth, inHeight, inWidth, strideDepth, strideHeight, strideWidth, effectiveFilterDepth, effectiveFilterHeight, effectiveFilterWidth, roundingMode),
	      padInfo = _get3DPadAndOutInfo.padInfo,
	      outDepth = _get3DPadAndOutInfo.outDepth,
	      outHeight = _get3DPadAndOutInfo.outHeight,
	      outWidth = _get3DPadAndOutInfo.outWidth;

	  var outChannels = depthwise ? filterChannels * inChannels : filterChannels;
	  var outShape;

	  if (dataFormat === 'channelsFirst') {
	    outShape = [batchSize, outChannels, outDepth, outHeight, outWidth];
	  } else if (dataFormat === 'channelsLast') {
	    outShape = [batchSize, outDepth, outHeight, outWidth, outChannels];
	  }

	  return {
	    batchSize: batchSize,
	    dataFormat: dataFormat,
	    inDepth: inDepth,
	    inHeight: inHeight,
	    inWidth: inWidth,
	    inChannels: inChannels,
	    outDepth: outDepth,
	    outHeight: outHeight,
	    outWidth: outWidth,
	    outChannels: outChannels,
	    padInfo: padInfo,
	    strideDepth: strideDepth,
	    strideHeight: strideHeight,
	    strideWidth: strideWidth,
	    filterDepth: filterDepth,
	    filterHeight: filterHeight,
	    filterWidth: filterWidth,
	    effectiveFilterDepth: effectiveFilterDepth,
	    effectiveFilterHeight: effectiveFilterHeight,
	    effectiveFilterWidth: effectiveFilterWidth,
	    dilationDepth: dilationDepth,
	    dilationHeight: dilationHeight,
	    dilationWidth: dilationWidth,
	    inShape: inShape,
	    outShape: outShape,
	    filterShape: filterShape
	  };
	}