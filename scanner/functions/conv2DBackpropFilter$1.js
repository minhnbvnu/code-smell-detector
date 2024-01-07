function conv2DBackpropFilter$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      dy = inputs.dy;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dimRoundingMode = attrs.dimRoundingMode,
	      filterShape = attrs.filterShape;
	  assertNotComplex([x, dy], 'conv2dBackpropFilter');
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(x.shape, filterShape, strides, 1
	  /* dilations */
	  , pad, dimRoundingMode, false
	  /* depthwise */
	  , $dataFormat);
	  var strideHeight = convInfo.strideHeight,
	      strideWidth = convInfo.strideWidth,
	      filterHeight = convInfo.filterHeight,
	      filterWidth = convInfo.filterWidth;
	  var isChannelsLast = convInfo.dataFormat === 'channelsLast';
	  var dW = new TensorBuffer(convInfo.filterShape, 'float32');
	  var leftPad = convInfo.padInfo.left;
	  var topPad = convInfo.padInfo.top;
	  var xVals = backend.data.get(x.dataId).values;
	  var dyVals = backend.data.get(dy.dataId).values;
	  var xBuf = new TensorBuffer(x.shape, x.dtype, xVals);
	  var dyBuf = new TensorBuffer(dy.shape, dy.dtype, dyVals);

	  for (var wR = 0; wR < filterHeight; ++wR) {
	    var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
	    var yRMax = Math.min(convInfo.outHeight, (convInfo.inHeight + topPad - wR) / strideHeight);

	    for (var wC = 0; wC < filterWidth; ++wC) {
	      var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
	      var yCMax = Math.min(convInfo.outWidth, (convInfo.inWidth + leftPad - wC) / strideWidth);

	      for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
	        for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
	          var dotProd = 0;

	          for (var b = 0; b < convInfo.batchSize; ++b) {
	            for (var yR = yRMin; yR < yRMax; ++yR) {
	              var xR = wR + yR * strideHeight - topPad;

	              for (var yC = yCMin; yC < yCMax; ++yC) {
	                var xC = wC + yC * strideWidth - leftPad;

	                if (isChannelsLast) {
	                  dotProd += xBuf.get(b, xR, xC, d1) * dyBuf.get(b, yR, yC, d2);
	                } else {
	                  dotProd += xBuf.get(b, d1, xR, xC) * dyBuf.get(b, d2, yR, yC);
	                }
	              }
	            }
	          }

	          dW.set(dotProd, wR, wC, d1, d2);
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dW.shape, dW.dtype, dW.values);
	}