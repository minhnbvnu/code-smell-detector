function pool$1(xValues, xShape, dtype, strides, convInfo, poolType) {
	  var strideHeight = convInfo.strideHeight;
	  var strideWidth = convInfo.strideWidth;
	  var dilationHeight = convInfo.dilationHeight;
	  var dilationWidth = convInfo.dilationWidth;
	  var effectiveFilterHeight = convInfo.effectiveFilterHeight;
	  var effectiveFilterWidth = convInfo.effectiveFilterWidth;
	  var padTop = convInfo.padInfo.top;
	  var padLeft = convInfo.padInfo.left;
	  var initialValue = poolType === 'max' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
	  var output = buffer(convInfo.outShape, dtype);
	  var outputVals = output.values;
	  var outputBatchStrides = convInfo.outShape[1] * convInfo.outShape[2] * convInfo.outShape[3];
	  var outputRowStrides = convInfo.outShape[2] * convInfo.outShape[3];
	  var outputColStrides = convInfo.outShape[3];

	  for (var b = 0; b < convInfo.batchSize; ++b) {
	    var outputBatchOffset = b * outputBatchStrides;
	    var inputBatchOffset = b * strides[0];

	    for (var d = 0; d < convInfo.inChannels; ++d) {
	      for (var yR = 0; yR < convInfo.outHeight; ++yR) {
	        var xRCorner = yR * strideHeight - padTop;
	        var xRMin = Math.max(0, xRCorner);
	        var xRMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRCorner);
	        var outputRowOffset = outputBatchOffset + yR * outputRowStrides;

	        for (var yC = 0; yC < convInfo.outWidth; ++yC) {
	          var xCCorner = yC * strideWidth - padLeft;
	          var xCMin = Math.max(0, xCCorner);
	          var xCMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xCCorner);
	          var minMaxValue = initialValue;
	          var avgValue = 0;
	          var count = 0;

	          for (var xR = xRMin; xR < xRMax; xR += dilationHeight) {
	            var xROffset = inputBatchOffset + xR * strides[1];

	            for (var xC = xCMin; xC < xCMax; xC += dilationWidth) {
	              var xCOffset = xROffset + xC * strides[2];
	              var pixel = xValues[xCOffset + d];

	              if (poolType === 'max' && pixel > minMaxValue) {
	                minMaxValue = pixel;
	              } else if (poolType === 'avg') {
	                avgValue += pixel;
	                count++;
	              }
	            }

	            if (isNaN(minMaxValue)) {
	              break;
	            }
	          }

	          var outputOffset = outputRowOffset + yC * outputColStrides + d;
	          outputVals[outputOffset] = poolType === 'avg' ? avgValue / count : minMaxValue;
	        }
	      }
	    }
	  }

	  return output;
	}