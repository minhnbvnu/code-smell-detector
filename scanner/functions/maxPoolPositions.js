function maxPoolPositions(xValues, xShape, dtype, convInfo, flattenPositions, includeBatchInIndex) {
	  if (flattenPositions === void 0) {
	    flattenPositions = false;
	  }

	  if (includeBatchInIndex === void 0) {
	    includeBatchInIndex = false;
	  }

	  var maxPositions = buffer(convInfo.outShape, 'int32');
	  var strideHeight = convInfo.strideHeight;
	  var strideWidth = convInfo.strideWidth;
	  var dilationHeight = convInfo.dilationHeight;
	  var dilationWidth = convInfo.dilationWidth;
	  var effectiveFilterHeight = convInfo.effectiveFilterHeight;
	  var effectiveFilterWidth = convInfo.effectiveFilterWidth;
	  var padTop = convInfo.padInfo.top;
	  var padLeft = convInfo.padInfo.left;
	  var xBuf = buffer(xShape, dtype, xValues);

	  for (var b = 0; b < convInfo.batchSize; ++b) {
	    for (var d = 0; d < convInfo.inChannels; ++d) {
	      for (var yR = 0; yR < convInfo.outHeight; ++yR) {
	        var xRCorner = yR * strideHeight - padTop;
	        var xRMin = xRCorner;

	        while (xRMin < 0) {
	          xRMin += dilationHeight;
	        } // const xRMin = Math.max(0, xRCorner);


	        var xRMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRCorner);

	        for (var yC = 0; yC < convInfo.outWidth; ++yC) {
	          var xCCorner = yC * strideWidth - padLeft;
	          var xCMin = xCCorner;

	          while (xCMin < 0) {
	            xCMin += dilationWidth;
	          }

	          var xCMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xCCorner);
	          var maxValue = Number.NEGATIVE_INFINITY;
	          var maxPosition = -1;

	          for (var xR = xRMin; xR < xRMax; xR += dilationHeight) {
	            var wR = xR - xRCorner;

	            for (var xC = xCMin; xC < xCMax; xC += dilationWidth) {
	              var wC = xC - xCCorner;
	              var pixel = xBuf.get(b, xR, xC, d);

	              if (pixel > maxValue) {
	                maxValue = pixel;

	                if (flattenPositions) {
	                  maxPosition = includeBatchInIndex ? ((b * convInfo.inHeight + xR) * convInfo.inWidth + xC) * convInfo.inChannels + d : (xR * convInfo.inWidth + xC) * convInfo.inChannels + d;
	                } else {
	                  maxPosition = wR * effectiveFilterWidth + wC;
	                }
	              }
	            }
	          }

	          maxPositions.set(maxPosition, b, yR, yC, d);
	        }
	      }
	    }
	  }

	  return maxPositions;
	}