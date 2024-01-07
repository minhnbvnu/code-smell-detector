function depthwiseConv2dNativeBackpropInput$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      dilations = attrs.dilations,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode,
	      inputShape = attrs.inputShape;
	  assertNotComplex([dy, filter], 'depthwiseConv2DNativeBackpropInput');
	  var dyStrides = computeStrides(dy.shape);
	  var filterStrides = computeStrides(filter.shape);
	  var convInfo = computeConv2DInfo(inputShape, filter.shape, strides, dilations, pad, dimRoundingMode, true
	  /* depthwise */
	  );
	  var dx = new TensorBuffer(convInfo.inShape, 'float32');
	  var dxValues = dx.values;
	  var _dx$strides = dx.strides,
	      dxS0 = _dx$strides[0],
	      dxS1 = _dx$strides[1],
	      dxS2 = _dx$strides[2];
	  var dyValues = backend.data.get(dy.dataId).values;
	  var dyS0 = dyStrides[0],
	      dyS1 = dyStrides[1],
	      dyS2 = dyStrides[2];
	  var fltValues = backend.data.get(filter.dataId).values;
	  var fltS0 = filterStrides[0],
	      fltS1 = filterStrides[1],
	      fltS2 = filterStrides[2];
	  var batchSize = convInfo.batchSize,
	      filterHeight = convInfo.filterHeight,
	      filterWidth = convInfo.filterWidth,
	      inChannels = convInfo.inChannels,
	      inHeight = convInfo.inHeight,
	      inWidth = convInfo.inWidth,
	      outChannels = convInfo.outChannels,
	      outHeight = convInfo.outHeight,
	      outWidth = convInfo.outWidth,
	      strideHeight = convInfo.strideHeight,
	      strideWidth = convInfo.strideWidth;
	  var topPad = filterHeight - 1 - convInfo.padInfo.top;
	  var leftPad = filterWidth - 1 - convInfo.padInfo.left;
	  var chMul = outChannels / inChannels;

	  for (var b = 0; b < batchSize; ++b) {
	    for (var d1 = 0; d1 < inChannels; ++d1) {
	      for (var xR = 0; xR < inHeight; ++xR) {
	        var xRCorner = xR - topPad;
	        var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
	        var yRMax = Math.min(outHeight, (filterHeight + xRCorner) / strideHeight);

	        for (var xC = 0; xC < inWidth; ++xC) {
	          var xCCorner = xC - leftPad;
	          var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
	          var yCMax = Math.min(outWidth, (filterWidth + xCCorner) / strideWidth);
	          var dotProd = 0;

	          for (var yR = xRMin; yR < yRMax; ++yR) {
	            var wR = yR * strideHeight - xRCorner;

	            for (var yC = xCMin; yC < yCMax; ++yC) {
	              var wC = yC * strideWidth - xCCorner;
	              var dyOffset = dyS0 * b + dyS1 * yR + dyS2 * yC;
	              var fltOffset = fltS0 * (filterHeight - 1 - wR) + fltS1 * (filterWidth - 1 - wC) + fltS2 * d1;

	              for (var dm = 0; dm < chMul; ++dm) {
	                var d2 = d1 * chMul + dm;
	                var pixel = dyValues[dyOffset + d2];
	                var weight = fltValues[fltOffset + dm];
	                dotProd += pixel * weight;
	              }
	            }
	          }

	          dxValues[dxS0 * b + dxS1 * xR + dxS2 * xC + d1] = dotProd;
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
	}