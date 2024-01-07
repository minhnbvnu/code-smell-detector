function depthwiseConv2dNative(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode;
	  assertNotComplex([x, filter], 'depthwiseConv2DNative');
	  var xStrides = computeStrides(x.shape);
	  var filterStrides = computeStrides(filter.shape);
	  var $dilations = dilations;

	  if ($dilations == null) {
	    $dilations = [1, 1];
	  }

	  assert(eitherStridesOrDilationsAreOne(strides, $dilations), function () {
	    return 'Error in depthwiseConv2d: Either strides or dilations must be ' + ("1. Got strides " + strides + " and dilations '" + $dilations + "'");
	  });
	  var convInfo = computeConv2DInfo(x.shape, filter.shape, strides, $dilations, pad, dimRoundingMode, true
	  /* depthwise */
	  );
	  var filterHeight = convInfo.filterHeight,
	      filterWidth = convInfo.filterWidth,
	      dilationHeight = convInfo.dilationHeight,
	      dilationWidth = convInfo.dilationWidth,
	      padInfo = convInfo.padInfo;
	  var padLeft = padInfo.left;
	  var padTop = padInfo.top;
	  var chMul = convInfo.outChannels / convInfo.inChannels;
	  var y = new TensorBuffer(convInfo.outShape, x.dtype);
	  var xVals = backend.data.get(x.dataId).values;
	  var wVals = backend.data.get(filter.dataId).values;
	  var yVals = y.values;

	  for (var b = 0; b < convInfo.batchSize; ++b) {
	    var xOffset1 = b * xStrides[0];
	    var yOffset1 = b * y.strides[0];

	    for (var yR = 0; yR < convInfo.outHeight; ++yR) {
	      var yOffset2 = yOffset1 + yR * y.strides[1];
	      var xRCorner = yR * convInfo.strideHeight - padLeft;

	      for (var wR = 0; wR < filterHeight; ++wR) {
	        var xR = xRCorner + wR * dilationHeight;

	        if (xR < 0 || xR >= convInfo.inHeight) {
	          continue;
	        }

	        var wOffset1 = wR * filterStrides[0];
	        var xOffset2 = xOffset1 + xR * xStrides[1];

	        for (var yC = 0; yC < convInfo.outWidth; ++yC) {
	          var yOffset3 = yOffset2 + yC * y.strides[2];
	          var xCCorner = yC * convInfo.strideWidth - padTop;

	          for (var wC = 0; wC < filterWidth; ++wC) {
	            var xC = xCCorner + wC * dilationWidth;

	            if (xC < 0 || xC >= convInfo.inWidth) {
	              continue;
	            }

	            var wOffset2 = wOffset1 + wC * filterStrides[1];
	            var xOffset3 = xOffset2 + xC * convInfo.inChannels;
	            var yOffset4 = yOffset3;
	            var wOffset3 = wOffset2;

	            for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
	              var xVal = xVals[xOffset3 + d1];

	              for (var q = 0; q < chMul; ++q) {
	                yVals[yOffset4 + q] += xVal * wVals[wOffset3 + q];
	              }

	              yOffset4 += chMul;
	              wOffset3 += chMul;
	            }
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(y.shape, y.dtype, y.values);
	}