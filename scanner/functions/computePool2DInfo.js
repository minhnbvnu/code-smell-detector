function computePool2DInfo(inShape, filterSize, strides, dilations, pad, roundingMode, dataFormat) {
	  if (dataFormat === void 0) {
	    dataFormat = 'channelsLast';
	  }

	  var _parseTupleParam = parseTupleParam(filterSize),
	      filterHeight = _parseTupleParam[0],
	      filterWidth = _parseTupleParam[1];

	  var filterShape;

	  if (dataFormat === 'channelsLast') {
	    filterShape = [filterHeight, filterWidth, inShape[3], inShape[3]];
	  } else if (dataFormat === 'channelsFirst') {
	    filterShape = [filterHeight, filterWidth, inShape[1], inShape[1]];
	  } else {
	    throw new Error("Unknown dataFormat " + dataFormat);
	  }

	  return computeConv2DInfo(inShape, filterShape, strides, dilations, pad, roundingMode, false, dataFormat);
	}