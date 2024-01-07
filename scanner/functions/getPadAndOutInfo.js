function getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth, roundingMode, dataFormat) {
	  var padInfo;
	  var outHeight;
	  var outWidth;

	  if (typeof pad === 'number') {
	    var padType = pad === 0 ? 'VALID' : 'NUMBER';
	    padInfo = {
	      top: pad,
	      bottom: pad,
	      left: pad,
	      right: pad,
	      type: padType
	    };
	    var outShape = computeOutputShape2D([inHeight, inWidth], filterHeight, strideHeight, pad, roundingMode);
	    outHeight = outShape[0];
	    outWidth = outShape[1];
	  } else if (pad === 'same') {
	    outHeight = Math.ceil(inHeight / strideHeight);
	    outWidth = Math.ceil(inWidth / strideWidth);
	    var padAlongHeight = Math.max(0, (outHeight - 1) * strideHeight + filterHeight - inHeight);
	    var padAlongWidth = Math.max(0, (outWidth - 1) * strideWidth + filterWidth - inWidth);
	    var top = Math.floor(padAlongHeight / 2);
	    var bottom = padAlongHeight - top;
	    var left = Math.floor(padAlongWidth / 2);
	    var right = padAlongWidth - left;
	    padInfo = {
	      top: top,
	      bottom: bottom,
	      left: left,
	      right: right,
	      type: 'SAME'
	    };
	  } else if (pad === 'valid') {
	    padInfo = {
	      top: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      type: 'VALID'
	    };
	    outHeight = Math.ceil((inHeight - filterHeight + 1) / strideHeight);
	    outWidth = Math.ceil((inWidth - filterWidth + 1) / strideWidth);
	  } else if (typeof pad === 'object') {
	    var _top = dataFormat === 'channelsLast' ? pad[1][0] : pad[2][0];

	    var _bottom = dataFormat === 'channelsLast' ? pad[1][1] : pad[2][1];

	    var _left = dataFormat === 'channelsLast' ? pad[2][0] : pad[3][0];

	    var _right = dataFormat === 'channelsLast' ? pad[2][1] : pad[3][1];

	    var _padType = _top === 0 && _bottom === 0 && _left === 0 && _right === 0 ? 'VALID' : 'EXPLICIT';

	    padInfo = {
	      top: _top,
	      bottom: _bottom,
	      left: _left,
	      right: _right,
	      type: _padType
	    };
	    outHeight = round((inHeight - filterHeight + _top + _bottom) / strideHeight + 1, roundingMode);
	    outWidth = round((inWidth - filterWidth + _left + _right) / strideWidth + 1, roundingMode);
	  } else {
	    throw Error("Unknown padding parameter: " + pad);
	  }

	  return {
	    padInfo: padInfo,
	    outHeight: outHeight,
	    outWidth: outWidth
	  };
	}