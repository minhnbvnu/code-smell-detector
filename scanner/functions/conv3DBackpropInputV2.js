function conv3DBackpropInputV2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      filter = inputs.filter;
	  var pad = attrs.pad,
	      strides = attrs.strides,
	      inputShape = attrs.inputShape;
	  assertNotComplex([dy], 'conv3dBackpropInputV2');
	  var dyStrides = computeStrides(dy.shape);
	  var filterStrides = computeStrides(filter.shape);
	  var convInfo = computeConv3DInfo(inputShape, filter.shape, strides, 1
	  /* dilations */
	  , pad);
	  var dx = new TensorBuffer(convInfo.inShape, 'float32');
	  var dxValues = dx.values;
	  var _dx$strides = dx.strides,
	      dxS0 = _dx$strides[0],
	      dxS1 = _dx$strides[1],
	      dxS2 = _dx$strides[2],
	      dxS3 = _dx$strides[3];
	  var dyValues = backend.data.get(dy.dataId).values;
	  var dyS0 = dyStrides[0],
	      dyS1 = dyStrides[1],
	      dyS2 = dyStrides[2],
	      dyS3 = dyStrides[3];
	  var fltValues = backend.data.get(filter.dataId).values;
	  var fltS0 = filterStrides[0],
	      fltS1 = filterStrides[1],
	      fltS2 = filterStrides[2],
	      fltS3 = filterStrides[3];
	  var batchSize = convInfo.batchSize,
	      filterDepth = convInfo.filterDepth,
	      filterHeight = convInfo.filterHeight,
	      filterWidth = convInfo.filterWidth,
	      inChannels = convInfo.inChannels,
	      inDepth = convInfo.inDepth,
	      inHeight = convInfo.inHeight,
	      inWidth = convInfo.inWidth,
	      outChannels = convInfo.outChannels,
	      outDepth = convInfo.outDepth,
	      outHeight = convInfo.outHeight,
	      outWidth = convInfo.outWidth,
	      strideDepth = convInfo.strideDepth,
	      strideHeight = convInfo.strideHeight,
	      strideWidth = convInfo.strideWidth;
	  var frontPad = filterDepth - 1 - convInfo.padInfo.front;
	  var topPad = filterHeight - 1 - convInfo.padInfo.top;
	  var leftPad = filterWidth - 1 - convInfo.padInfo.left;

	  for (var b = 0; b < batchSize; ++b) {
	    for (var d1 = 0; d1 < inChannels; ++d1) {
	      // Frames of depth
	      for (var xF = 0; xF < inDepth; ++xF) {
	        var xFCorner = xF - frontPad;
	        var xFMin = Math.max(0, Math.ceil(xFCorner / strideDepth));
	        var yFMax = Math.min(outDepth, (filterDepth + xFCorner) / strideDepth); // Rows as per standard 2d matrix notation

	        for (var xR = 0; xR < inHeight; ++xR) {
	          var xRCorner = xR - topPad;
	          var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
	          var yRMax = Math.min(outHeight, (filterHeight + xRCorner) / strideHeight); // Columns as per standard 2d matrix notation

	          for (var xC = 0; xC < inWidth; ++xC) {
	            var xCCorner = xC - leftPad;
	            var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
	            var yCMax = Math.min(outWidth, (filterWidth + xCCorner) / strideWidth);
	            var dotProd = 0;

	            for (var yF = xFMin; yF < yFMax; ++yF) {
	              var wF = yF * strideDepth - xFCorner;

	              for (var yR = xRMin; yR < yRMax; ++yR) {
	                var wR = yR * strideHeight - xRCorner;

	                for (var yC = xCMin; yC < yCMax; ++yC) {
	                  var wC = yC * strideWidth - xCCorner;
	                  var dyOffset = dyS0 * b + dyS1 * yF + dyS2 * yR + dyS3 * yC;
	                  var fltOffset = fltS0 * (filterDepth - 1 - wF) + fltS1 * (filterHeight - 1 - wR) + fltS2 * (filterWidth - 1 - wC) + fltS3 * d1;

	                  for (var d2 = 0; d2 < outChannels; ++d2) {
	                    var pixel = dyValues[dyOffset + d2];
	                    var weight = fltValues[fltOffset + d2];
	                    dotProd += pixel * weight;
	                  }
	                }
	              }
	            }

	            dxValues[dxS0 * b + dxS1 * xF + dxS2 * xR + dxS3 * xC + d1] = dotProd;
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
	}