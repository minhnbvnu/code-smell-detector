function get3DPadAndOutInfo(pad, inDepth, inHeight, inWidth, strideDepth, strideHeight, strideWidth, filterDepth, filterHeight, filterWidth, roundingMode) {
	  var padInfo;
	  var outDepth;
	  var outHeight;
	  var outWidth;

	  if (typeof pad === 'number') {
	    var padType = pad === 0 ? 'VALID' : 'NUMBER';
	    padInfo = {
	      top: pad,
	      bottom: pad,
	      left: pad,
	      right: pad,
	      front: pad,
	      back: pad,
	      type: padType
	    };
	    var outShape = computeOutputShape4D([inDepth, inHeight, inWidth, 1], filterDepth, 1, strideDepth, pad, roundingMode);
	    outDepth = outShape[0];
	    outHeight = outShape[1];
	    outWidth = outShape[2];
	  } else if (pad === 'same') {
	    outDepth = Math.ceil(inDepth / strideDepth);
	    outHeight = Math.ceil(inHeight / strideHeight);
	    outWidth = Math.ceil(inWidth / strideWidth);
	    var padAlongDepth = (outDepth - 1) * strideDepth + filterDepth - inDepth;
	    var padAlongHeight = (outHeight - 1) * strideHeight + filterHeight - inHeight;
	    var padAlongWidth = (outWidth - 1) * strideWidth + filterWidth - inWidth;
	    var front = Math.floor(padAlongDepth / 2);
	    var back = padAlongDepth - front;
	    var top = Math.floor(padAlongHeight / 2);
	    var bottom = padAlongHeight - top;
	    var left = Math.floor(padAlongWidth / 2);
	    var right = padAlongWidth - left;
	    padInfo = {
	      top: top,
	      bottom: bottom,
	      left: left,
	      right: right,
	      front: front,
	      back: back,
	      type: 'SAME'
	    };
	  } else if (pad === 'valid') {
	    padInfo = {
	      top: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      front: 0,
	      back: 0,
	      type: 'VALID'
	    };
	    outDepth = Math.ceil((inDepth - filterDepth + 1) / strideDepth);
	    outHeight = Math.ceil((inHeight - filterHeight + 1) / strideHeight);
	    outWidth = Math.ceil((inWidth - filterWidth + 1) / strideWidth);
	  } else {
	    throw Error("Unknown padding parameter: " + pad);
	  }

	  return {
	    padInfo: padInfo,
	    outDepth: outDepth,
	    outHeight: outHeight,
	    outWidth: outWidth
	  };
	}