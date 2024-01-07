function maxPoolGrad$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      input = inputs.input,
	      output = inputs.output;
	  var x = input;
	  assertNotComplex([input, output], 'maxPoolGrad');
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var convInfo = computePool2DInfo(x.shape, filterSize, strides, 1
	  /* dilations */
	  , pad, dimRoundingMode);
	  var xValues = backend.data.get(x.dataId).values;
	  var maxPosBuf = buffer(convInfo.outShape, x.dtype, maxPoolPositions(xValues, x.shape, x.dtype, convInfo).values);
	  var strideHeight = convInfo.strideHeight;
	  var strideWidth = convInfo.strideWidth;
	  var dilationHeight = convInfo.dilationHeight;
	  var dilationWidth = convInfo.dilationWidth;
	  var effectiveFilterHeight = convInfo.effectiveFilterHeight;
	  var effectiveFilterWidth = convInfo.effectiveFilterWidth;
	  var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
	  var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
	  var dx = buffer(x.shape, 'float32');
	  var dyData = backend.data.get(dy.dataId).values;
	  var dyBuf = buffer(dy.shape, 'float32', dyData);

	  for (var b = 0; b < convInfo.batchSize; ++b) {
	    for (var d = 0; d < convInfo.inChannels; ++d) {
	      for (var dxR = 0; dxR < convInfo.inHeight; ++dxR) {
	        for (var dxC = 0; dxC < convInfo.inWidth; ++dxC) {
	          // Shader code begins.
	          var dyRCorner = dxR - padTop;
	          var dyCCorner = dxC - padLeft;
	          var dotProd = 0;

	          for (var wR = 0; wR < effectiveFilterHeight; wR += dilationHeight) {
	            var dyR = (dyRCorner + wR) / strideHeight;

	            if (dyR < 0 || dyR >= convInfo.outHeight || Math.floor(dyR) !== dyR) {
	              continue;
	            }

	            for (var wC = 0; wC < effectiveFilterWidth; wC += dilationWidth) {
	              var dyC = (dyCCorner + wC) / strideWidth;

	              if (dyC < 0 || dyC >= convInfo.outWidth || Math.floor(dyC) !== dyC) {
	                continue;
	              }

	              var maxPos = effectiveFilterHeight * effectiveFilterWidth - 1 - maxPosBuf.get(b, dyR, dyC, d);
	              var curPos = wR * effectiveFilterWidth + wC;
	              var mask = maxPos === curPos ? 1 : 0;

	              if (mask === 0) {
	                continue;
	              }

	              var pixel = dyBuf.get(b, dyR, dyC, d);
	              dotProd += pixel * mask;
	            }
	          }

	          dx.set(dotProd, b, dxR, dxC, d);
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
	}