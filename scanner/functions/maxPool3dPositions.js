function maxPool3dPositions(xBuf, convInfo) {
	  var maxPositions = buffer(convInfo.outShape, 'int32');
	  var strideDepth = convInfo.strideDepth;
	  var strideHeight = convInfo.strideHeight;
	  var strideWidth = convInfo.strideWidth;
	  var dilationDepth = convInfo.dilationDepth;
	  var dilationHeight = convInfo.dilationHeight;
	  var dilationWidth = convInfo.dilationWidth;
	  var effectiveFilterDepth = convInfo.effectiveFilterDepth;
	  var effectiveFilterHeight = convInfo.effectiveFilterHeight;
	  var effectiveFilterWidth = convInfo.effectiveFilterWidth;
	  var padFront = convInfo.padInfo.front;
	  var padTop = convInfo.padInfo.top;
	  var padLeft = convInfo.padInfo.left;

	  for (var batch = 0; batch < convInfo.batchSize; ++batch) {
	    for (var channel = 0; channel < convInfo.inChannels; ++channel) {
	      for (var yDepth = 0; yDepth < convInfo.outDepth; ++yDepth) {
	        var xDepthCorner = yDepth * strideDepth - padFront;
	        var xDepthMin = xDepthCorner;

	        while (xDepthMin < 0) {
	          xDepthMin += dilationDepth;
	        }

	        var xDepthMax = Math.min(convInfo.inDepth, effectiveFilterDepth + xDepthCorner);

	        for (var yRow = 0; yRow < convInfo.outHeight; ++yRow) {
	          var xRowCorner = yRow * strideHeight - padTop;
	          var xRowMin = xRowCorner;

	          while (xRowMin < 0) {
	            xRowMin += dilationHeight;
	          }

	          var xRowMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRowCorner);

	          for (var yCol = 0; yCol < convInfo.outWidth; ++yCol) {
	            var xColCorner = yCol * strideWidth - padLeft;
	            var xColMin = xColCorner;

	            while (xColMin < 0) {
	              xColMin += dilationWidth;
	            }

	            var xColMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xColCorner); // Shader code begins

	            var maxValue = Number.NEGATIVE_INFINITY;
	            var maxPosition = -1;

	            for (var xDepth = xDepthMin; xDepth < xDepthMax; xDepth += dilationDepth) {
	              var wDepth = xDepth - xDepthCorner;

	              for (var xRow = xRowMin; xRow < xRowMax; xRow += dilationHeight) {
	                var wRow = xRow - xRowCorner;

	                for (var xCol = xColMin; xCol < xColMax; xCol += dilationWidth) {
	                  var wCol = xCol - xColCorner;
	                  var pixel = xBuf.get(batch, xDepth, xRow, xCol, channel);

	                  if (pixel >= maxValue) {
	                    maxValue = pixel;
	                    maxPosition = wDepth * effectiveFilterHeight * effectiveFilterWidth + wRow * effectiveFilterHeight + wCol;
	                  }
	                }
	              }
	            }

	            maxPositions.set(maxPosition, batch, yDepth, yRow, yCol, channel);
	          }
	        }
	      }
	    }
	  }

	  return maxPositions;
	}