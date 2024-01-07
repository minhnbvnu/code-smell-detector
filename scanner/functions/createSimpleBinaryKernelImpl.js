function createSimpleBinaryKernelImpl(op) {
	  return function (aShape, bShape, aVals, bVals, dtype) {
	    var newShape = assertAndGetBroadcastShape(aShape, bShape);
	    var resultRank = newShape.length;
	    var resultStrides = computeStrides(newShape);
	    var resultSize = sizeFromShape(newShape);
	    var result = getTypedArrayFromDType(dtype, resultSize);
	    var aRank = aShape.length;
	    var bRank = bShape.length;
	    var aStrides = computeStrides(aShape);
	    var bStrides = computeStrides(bShape);
	    var aBroadcastDims = getBroadcastDims(aShape, newShape);
	    var bBroadcastDims = getBroadcastDims(bShape, newShape);

	    if (aBroadcastDims.length + bBroadcastDims.length === 0) {
	      for (var i = 0; i < result.length; ++i) {
	        result[i] = op(aVals[i % aVals.length], bVals[i % bVals.length]);
	      }
	    } else {
	      var _loop = function _loop(_i) {
	        var loc = indexToLoc(_i, resultRank, resultStrides);
	        var aLoc = loc.slice(-aRank);
	        aBroadcastDims.forEach(function (d) {
	          return aLoc[d] = 0;
	        });
	        var aIndex = locToIndex(aLoc, aRank, aStrides);
	        var bLoc = loc.slice(-bRank);
	        bBroadcastDims.forEach(function (d) {
	          return bLoc[d] = 0;
	        });
	        var bIndex = locToIndex(bLoc, bRank, bStrides);
	        result[_i] = op(aVals[aIndex], bVals[bIndex]);
	      };

	      for (var _i = 0; _i < result.length; ++_i) {
	        _loop(_i);
	      }
	    }

	    return [result, newShape];
	  };
	}