function conv3D(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations;
	  assertNotComplex([x, filter], 'conv3d');
	  var convInfo = computeConv3DInfo(x.shape, filter.shape, strides, dilations, pad);
	  var filterDepth = convInfo.filterDepth,
	      filterHeight = convInfo.filterHeight,
	      filterWidth = convInfo.filterWidth,
	      dilationDepth = convInfo.dilationDepth,
	      dilationHeight = convInfo.dilationHeight,
	      dilationWidth = convInfo.dilationWidth,
	      padInfo = convInfo.padInfo;
	  var padFront = padInfo.front;
	  var padLeft = padInfo.left;
	  var padTop = padInfo.top;
	  var y = new TensorBuffer(convInfo.outShape, x.dtype);
	  var xVals = backend.data.get(x.dataId).values;
	  var wVals = backend.data.get(filter.dataId).values;
	  var yVals = y.values;
	  var xStrides = computeStrides(x.shape);
	  var filterStrides = computeStrides(filter.shape);

	  for (var b = 0; b < convInfo.batchSize; ++b) {
	    var xOffset1 = b * xStrides[0];
	    var yOffset1 = b * y.strides[0];

	    for (var yF = 0; yF < convInfo.outDepth; ++yF) {
	      var yOffset2 = yOffset1 + yF * y.strides[1];
	      var xFCorner = yF * convInfo.strideDepth - padFront;

	      for (var wF = 0; wF < filterDepth; ++wF) {
	        var xF = xFCorner + wF * dilationDepth;

	        if (xF < 0 || xF >= convInfo.inDepth) {
	          continue;
	        }

	        var wOffset1 = wF * filterStrides[0];
	        var xOffset2 = xOffset1 + xF * xStrides[1];

	        for (var yR = 0; yR < convInfo.outHeight; ++yR) {
	          var yOffset3 = yOffset2 + yR * y.strides[2];
	          var xRCorner = yR * convInfo.strideHeight - padTop;

	          for (var wR = 0; wR < filterHeight; ++wR) {
	            var xR = xRCorner + wR * dilationHeight;

	            if (xR < 0 || xR >= convInfo.inHeight) {
	              continue;
	            }

	            var wOffset2 = wOffset1 + wR * filterStrides[1];
	            var xOffset3 = xOffset2 + xR * xStrides[2];

	            for (var yC = 0; yC < convInfo.outWidth; ++yC) {
	              var yOffset4 = yOffset3 + yC * convInfo.outChannels;
	              var xCCorner = yC * convInfo.strideWidth - padLeft;

	              for (var wC = 0; wC < filterWidth; ++wC) {
	                var xC = xCCorner + wC * dilationWidth;

	                if (xC < 0 || xC >= convInfo.inWidth) {
	                  continue;
	                }

	                var wOffset3 = wOffset2 + wC * filterStrides[2];
	                var xOffset4 = xOffset3 + xC * convInfo.inChannels;
	                var wOffset4 = wOffset3;

	                for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
	                  var xVal = xVals[xOffset4 + d1];

	                  for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
	                    yVals[yOffset4 + d2] += xVal * wVals[wOffset4 + d2];
	                  }

	                  wOffset4 += convInfo.outChannels;
	                }
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(y.shape, y.dtype, y.values);
	}