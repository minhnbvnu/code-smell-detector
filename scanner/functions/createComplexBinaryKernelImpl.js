function createComplexBinaryKernelImpl(op) {
	  return function (aShape, bShape, aRealVals, aImagVals, bRealVals, bImagVals) {
	    var resultShape = assertAndGetBroadcastShape(aShape, bShape);
	    var resultSize = sizeFromShape(resultShape);
	    var resultRank = resultShape.length;
	    var resultStrides = computeStrides(resultShape);
	    var resultRealVals = getTypedArrayFromDType('float32', resultSize);
	    var resultImagVals = getTypedArrayFromDType('float32', resultSize);
	    var aBroadcastDims = getBroadcastDims(aShape, resultShape);
	    var bBroadcastDims = getBroadcastDims(bShape, resultShape);
	    var aVals = mergeRealAndImagArrays(aRealVals, aImagVals);
	    var bVals = mergeRealAndImagArrays(bRealVals, bImagVals);
	    var aRank = aShape.length;
	    var aStrides = computeStrides(aShape);
	    var bRank = bShape.length;
	    var bStrides = computeStrides(bShape);

	    if (aBroadcastDims.length + bBroadcastDims.length === 0) {
	      for (var i = 0; i < resultRealVals.length; i++) {
	        var aIdx = i % aVals.length;
	        var bIdx = i % bVals.length;
	        var result = op(aVals[aIdx * 2], aVals[aIdx * 2 + 1], bVals[bIdx * 2], bVals[bIdx * 2 + 1]);
	        resultRealVals[i] = result.real;
	        resultImagVals[i] = result.imag;
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
	        var opResult = op(aVals[aIndex * 2], aVals[aIndex * 2 + 1], bVals[bIndex * 2], bVals[bIndex * 2 + 1]);
	        resultRealVals[_i] = opResult.real;
	        resultImagVals[_i] = opResult.imag;
	      };

	      for (var _i = 0; _i < resultRealVals.length; _i++) {
	        _loop(_i);
	      }
	    }

	    return [resultRealVals, resultImagVals, resultShape];
	  };
	}