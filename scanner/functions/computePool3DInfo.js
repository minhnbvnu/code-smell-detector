function computePool3DInfo(inShape, filterSize, strides, dilations, pad, roundingMode, dataFormat) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NDHWC';
	  }

	  var _parse3TupleParam = parse3TupleParam(filterSize),
	      filterDepth = _parse3TupleParam[0],
	      filterHeight = _parse3TupleParam[1],
	      filterWidth = _parse3TupleParam[2];

	  var filterShape;
	  var $dataFormat;

	  if (dataFormat === 'NDHWC') {
	    $dataFormat = 'channelsLast';
	    filterShape = [filterDepth, filterHeight, filterWidth, inShape[4], inShape[4]];
	  } else if (dataFormat === 'NCDHW') {
	    $dataFormat = 'channelsFirst';
	    filterShape = [filterDepth, filterHeight, filterWidth, inShape[1], inShape[1]];
	  } else {
	    throw new Error("Unknown dataFormat " + dataFormat);
	  }

	  return computeConv3DInfo(inShape, filterShape, strides, dilations, pad, false, $dataFormat, roundingMode);
	}