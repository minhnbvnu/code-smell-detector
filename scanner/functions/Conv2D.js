function conv2D(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode;
	  assertNotComplex([x, filter], 'conv2d');
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(x.shape, filter.shape, strides, dilations, pad, dimRoundingMode, false
	  /* depthwise */
	  , $dataFormat);
	  var filterHeight = convInfo.filterHeight;
	  var filterWidth = convInfo.filterWidth;
	  var dilationHeight = convInfo.dilationHeight;
	  var dilationWidth = convInfo.dilationWidth;
	  var padLeft = convInfo.padInfo.left;
	  var padTop = convInfo.padInfo.top;
	  var isChannelsLast = convInfo.dataFormat === 'channelsLast';
	  var y = new TensorBuffer(convInfo.outShape, x.dtype);
	  var xStrides = computeStrides(x.shape);
	  var filterStrides = computeStrides(filter.shape);
	  var xBatchStride = xStrides[0];
	  var xRowStride = isChannelsLast ? xStrides[1] : xStrides[2];
	  var xColStride = isChannelsLast ? xStrides[2] : 1;
	  var xChannelStride = isChannelsLast ? 1 : xStrides[1];
	  var yBatchStride = y.strides[0];
	  var yRowStride = isChannelsLast ? y.strides[1] : y.strides[2];
	  var yColStride = isChannelsLast ? y.strides[2] : 1;
	  var yChannelStride = isChannelsLast ? 1 : y.strides[1];
	  var xVals = backend.data.get(x.dataId).values;
	  var wVals = backend.data.get(filter.dataId).values;
	  var yVals = y.values;

	  for (var b = 0; b < convInfo.batchSize; ++b) {
	    var xOffset1 = b * xBatchStride;
	    var yOffset1 = b * yBatchStride;

	    for (var yR = 0; yR < convInfo.outHeight; ++yR) {
	      var yOffset2 = yOffset1 + yR * yRowStride;
	      var xRCorner = yR * convInfo.strideHeight - padTop;

	      for (var wR = 0; wR < filterHeight; ++wR) {
	        var xR = xRCorner + wR * dilationHeight;

	        if (xR < 0 || xR >= convInfo.inHeight) {
	          continue;
	        }

	        var wOffset1 = wR * filterStrides[0];
	        var xOffset2 = xOffset1 + xR * xRowStride;

	        for (var yC = 0; yC < convInfo.outWidth; ++yC) {
	          var yOffset3 = yOffset2 + yC * yColStride;
	          var xCCorner = yC * convInfo.strideWidth - padLeft;

	          for (var wC = 0; wC < filterWidth; ++wC) {
	            var xC = xCCorner + wC * dilationWidth;

	            if (xC < 0 || xC >= convInfo.inWidth) {
	              continue;
	            }

	            var wOffset2 = wOffset1 + wC * filterStrides[1];
	            var xOffset3 = xOffset2 + xC * xColStride;
	            var wOffset3 = wOffset2;

	            for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
	              var xVal = xVals[xOffset3 + d1 * xChannelStride];

	              for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
	                yVals[yOffset3 + d2 * yChannelStride] += xVal * wVals[wOffset3 + d2];
	              }

	              wOffset3 += convInfo.outChannels;
	            }
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(y.shape, y.dtype, yVals);
	}