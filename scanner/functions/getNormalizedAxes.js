function getNormalizedAxes(inputShape, ellipsisAxes, numInterpolatedAxes, begin, end, strides, beginMask, endMask, ellipsisMask) {
	  var inputRank = inputShape.length;
	  var normalizedBegin = new Array(inputRank),
	      normalizedEnd = new Array(inputRank),
	      normalizedStrides = new Array(inputRank);

	  if (ellipsisAxes.length && numInterpolatedAxes > 0) {
	    var fullIndex = ellipsisAxes[0]; // The ellipsis applies to the masked index as well as any dimensions
	    // that are interpolated.

	    var numElidedAxes = numInterpolatedAxes + 1;
	    normalizedBegin = startIndicesWithElidedDims(beginMask, fullIndex, numElidedAxes, begin, inputShape);
	    normalizedEnd = stopIndicesWithElidedDims(endMask, fullIndex, numElidedAxes, end, inputShape);
	    normalizedStrides = stridesWithElidedDims(strides, fullIndex, numElidedAxes, inputShape);
	  } else {
	    for (var axis = 0; axis < inputRank; axis++) {
	      normalizedBegin[axis] = startForAxis(beginMask, begin, strides, inputShape, axis, ellipsisMask);
	      normalizedEnd[axis] = stopForAxis(endMask, end, strides, inputShape, axis, ellipsisMask);
	      normalizedStrides[axis] = stridesForAxis(strides, axis, ellipsisMask);
	    }
	  }

	  return {
	    begin: normalizedBegin,
	    end: normalizedEnd,
	    strides: normalizedStrides
	  };
	}