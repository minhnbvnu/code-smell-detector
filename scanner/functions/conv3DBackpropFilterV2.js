function conv3DBackpropFilterV2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      dy = inputs.dy;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      filterShape = attrs.filterShape;
	  assertNotComplex([x, dy], 'conv3dBackpropFilterV2');
	  var xStrides = computeStrides(x.shape);
	  var dyStrides = computeStrides(dy.shape);
	  var convInfo = computeConv3DInfo(x.shape, filterShape, strides, 1
	  /* dilations */
	  , pad);
	  var strideDepth = convInfo.strideDepth;
	  var strideHeight = convInfo.strideHeight;
	  var strideWidth = convInfo.strideWidth;
	  var filterDepth = convInfo.filterDepth;
	  var filterHeight = convInfo.filterHeight;
	  var filterWidth = convInfo.filterWidth;
	  var dw = new TensorBuffer(convInfo.filterShape, 'float32');
	  var dwValues = dw.values;
	  var _dw$strides = dw.strides,
	      dwS0 = _dw$strides[0],
	      dwS1 = _dw$strides[1],
	      dwS2 = _dw$strides[2],
	      dwS3 = _dw$strides[3];
	  var dyValues = backend.data.get(dy.dataId).values;
	  var dyS0 = dyStrides[0],
	      dyS1 = dyStrides[1],
	      dyS2 = dyStrides[2],
	      dyS3 = dyStrides[3];
	  var xValues = backend.data.get(x.dataId).values;
	  var xS0 = xStrides[0],
	      xS1 = xStrides[1],
	      xS2 = xStrides[2],
	      xS3 = xStrides[3];
	  var frontPad = convInfo.padInfo.front;
	  var leftPad = convInfo.padInfo.left;
	  var topPad = convInfo.padInfo.top;

	  for (var wF = 0; wF < filterDepth; ++wF) {
	    var yFMin = Math.max(0, Math.ceil((frontPad - wF) / strideDepth));
	    var yFMax = Math.min(convInfo.outDepth, (convInfo.inDepth + frontPad - wF) / strideDepth);
	    var wOffset1 = wF * dwS0;

	    for (var wR = 0; wR < filterHeight; ++wR) {
	      var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
	      var yRMax = Math.min(convInfo.outHeight, (convInfo.inHeight + topPad - wR) / strideHeight);
	      var wOffset2 = wR * dwS1 + wOffset1;

	      for (var wC = 0; wC < filterWidth; ++wC) {
	        var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
	        var yCMax = Math.min(convInfo.outWidth, (convInfo.inWidth + leftPad - wC) / strideWidth);
	        var wOffset3 = wC * dwS2 + wOffset2;

	        for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
	          var wOffset4 = d1 * dwS3 + wOffset3;

	          for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
	            var dotProd = 0;

	            for (var b = 0; b < convInfo.batchSize; ++b) {
	              var xOffset1 = b * xS0;
	              var yOffset1 = b * dyS0;

	              for (var yF = yFMin; yF < yFMax; ++yF) {
	                var xF = wF + yF * strideDepth - frontPad;
	                var xOffset2 = xF * xS1 + xOffset1;
	                var yOffset2 = yF * dyS1 + yOffset1;

	                for (var yR = yRMin; yR < yRMax; ++yR) {
	                  var xR = wR + yR * strideHeight - topPad;
	                  var xOffset3 = xR * xS2 + xOffset2;
	                  var yOffset3 = yR * dyS2 + yOffset2;

	                  for (var yC = yCMin; yC < yCMax; ++yC) {
	                    var xC = wC + yC * strideWidth - leftPad;
	                    var xOffset4 = xC * xS3 + xOffset3;
	                    var yOffset4 = yC * dyS3 + yOffset3;
	                    dotProd += xValues[xOffset4 + d1] * dyValues[yOffset4 + d2];
	                  }
	                }
	              }
	            }

	            dwValues[wOffset4 + d2] = dotProd;
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dw.shape, dw.dtype, dw.values);
	}