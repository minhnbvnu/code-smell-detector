function pool3d$1(xValues, xShape, dtype, strides, convInfo, poolType) {
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
	  var initialValue = poolType === 'max' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
	  var output = buffer(convInfo.outShape, dtype);
	  var outputVals = output.values;
	  var outputBatchStrides = convInfo.outShape[1] * convInfo.outShape[2] * convInfo.outShape[3] * convInfo.outShape[4];
	  var outputDepthStrides = convInfo.outShape[2] * convInfo.outShape[3] * convInfo.outShape[4];
	  var outputRowStrides = convInfo.outShape[3] * convInfo.outShape[4];
	  var outputColStrides = convInfo.outShape[4];

	  for (var batch = 0; batch < convInfo.batchSize; ++batch) {
	    var outputBatchOffset = batch * outputBatchStrides;
	    var inputBatchOffset = batch * strides[0];

	    for (var channel = 0; channel < convInfo.inChannels; ++channel) {
	      for (var yDepth = 0; yDepth < convInfo.outDepth; ++yDepth) {
	        var xDepthCorner = yDepth * strideDepth - padFront;
	        var xDepthMin = xDepthCorner;

	        while (xDepthMin < 0) {
	          xDepthMin += dilationDepth;
	        }

	        var xDepthMax = Math.min(convInfo.inDepth, effectiveFilterDepth + xDepthCorner);
	        var outputDepthOffset = outputBatchOffset + yDepth * outputDepthStrides;

	        for (var yRow = 0; yRow < convInfo.outHeight; ++yRow) {
	          var xRowCorner = yRow * strideHeight - padTop;
	          var xRowMin = xRowCorner;

	          while (xRowMin < 0) {
	            xRowMin += dilationHeight;
	          }

	          var xRowMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRowCorner);
	          var outputRowOffset = outputDepthOffset + yRow * outputRowStrides;

	          for (var yCol = 0; yCol < convInfo.outWidth; ++yCol) {
	            var xColCorner = yCol * strideWidth - padLeft;
	            var xColMin = xColCorner;

	            while (xColMin < 0) {
	              xColMin += dilationWidth;
	            }

	            var xColMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xColCorner); // Shader code begins

	            var outputColOffset = outputRowOffset + yCol * outputColStrides;
	            var minMaxValue = initialValue;
	            var avgValue = 0;
	            var count = 0;

	            for (var xDepth = xDepthMin; xDepth < xDepthMax; xDepth += dilationDepth) {
	              var xDepthOffset = inputBatchOffset + xDepth * strides[1];

	              for (var xRow = xRowMin; xRow < xRowMax; xRow += dilationHeight) {
	                var xRowOffset = xDepthOffset + xRow * strides[2];

	                for (var xCol = xColMin; xCol < xColMax; xCol += dilationWidth) {
	                  var xColOffset = xRowOffset + xCol * strides[3];
	                  var pixel = xValues[xColOffset + channel];

	                  if (poolType === 'max' && pixel > minMaxValue) {
	                    minMaxValue = pixel;
	                  } else if (poolType === 'avg') {
	                    avgValue += pixel;
	                    count++;
	                  }

	                  if (isNaN(minMaxValue)) {
	                    break;
	                  }
	                }

	                if (isNaN(minMaxValue)) {
	                  break;
	                }
	              }

	              if (isNaN(minMaxValue)) {
	                break;
	              }
	            }

	            var outputOffset = outputColOffset + channel;
	            outputVals[outputOffset] = poolType === 'avg' ? avgValue / count : minMaxValue;
	          }
	        }
	      }
	    }
	  }

	  return output;
	}