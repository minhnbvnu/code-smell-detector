function conv2DBackpropInput$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      filter = inputs.filter;
	  var inputShape = attrs.inputShape,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dimRoundingMode = attrs.dimRoundingMode;
	  assertNotComplex([dy, filter], 'conv2dBackpropInput');
	  var filterStrides = computeStrides(filter.shape);
	  var dyStrides = computeStrides(dy.shape);
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(inputShape, filter.shape, strides, 1
	  /* dilations */
	  , pad, dimRoundingMode, false, $dataFormat);
	  var dx = new TensorBuffer(convInfo.inShape, 'float32');
	  var dxValues = dx.values;
	  var dyValues = backend.data.get(dy.dataId).values;
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
	  $dataFormat = convInfo.dataFormat;
	  var topPad = filterHeight - 1 - convInfo.padInfo.top;
	  var leftPad = filterWidth - 1 - convInfo.padInfo.left;
	  var isChannelsLast = $dataFormat === 'channelsLast';
	  var xBatchStride = dx.strides[0];
	  var xRowStride = isChannelsLast ? dx.strides[1] : dx.strides[2];
	  var xColStride = isChannelsLast ? dx.strides[2] : 1;
	  var xChannelStride = isChannelsLast ? 1 : dx.strides[1];
	  var yBatchStride = dyStrides[0];
	  var yRowStride = isChannelsLast ? dyStrides[1] : dyStrides[2];
	  var yColStride = isChannelsLast ? dyStrides[2] : 1;
	  var yChannelStride = isChannelsLast ? 1 : dyStrides[1];

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
	              var dyOffset = yBatchStride * b + yRowStride * yR + yColStride * yC;
	              var fltOffset = fltS0 * (filterHeight - 1 - wR) + fltS1 * (filterWidth - 1 - wC) + fltS2 * d1;

	              for (var d2 = 0; d2 < outChannels; ++d2) {
	                var pixel = dyValues[dyOffset + yChannelStride * d2];
	                var weight = fltValues[fltOffset + d2];
	                dotProd += pixel * weight;
	              }
	            }
	          }

	          var dxOffset = xBatchStride * b + xRowStride * xR + xColStride * xC + xChannelStride * d1;
	          dxValues[dxOffset] = dotProd;
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
	}