function resizeNearestNeighborGrad(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images,
	      dy = inputs.dy;
	  var alignCorners = attrs.alignCorners;
	  assertNotComplex([dy, images], 'resizeNearestNeighborGrad');
	  var imagesStrides = computeStrides(images.shape);
	  var dyStrides = computeStrides(dy.shape);
	  var _images$shape = images.shape,
	      batch = _images$shape[0],
	      xHeight = _images$shape[1],
	      xWidth = _images$shape[2],
	      depth = _images$shape[3];
	  var _dy$shape = dy.shape,
	      yHeight = _dy$shape[1],
	      yWidth = _dy$shape[2];
	  var output = new Float32Array(batch * xHeight * xWidth * depth);
	  var dyValues = backend.data.get(dy.dataId).values; // In the backwards pass, we want to find the pixels that were generated
	  // for each pixel in the input image the forward pass

	  var effectiveXSize = [alignCorners && yHeight > 1 ? xHeight - 1 : xHeight, alignCorners && yWidth > 1 ? xWidth - 1 : xWidth];
	  var effectiveYSize = [alignCorners && yHeight > 1 ? yHeight - 1 : yHeight, alignCorners && yWidth > 1 ? yWidth - 1 : yWidth];
	  var heightScale = effectiveXSize[0] / effectiveYSize[0];
	  var widthScale = effectiveXSize[1] / effectiveYSize[1];
	  var invHeightScale = 1 / heightScale;
	  var invWidthScale = 1 / widthScale; // This defines the size of the window of values around a particular
	  // index in dy that we want to search for contributions to dx.

	  var winHeight = Math.ceil(invHeightScale) * 2 + 2;
	  var winWidth = Math.ceil(invWidthScale) * 2 + 2; // Loop over the output space.

	  for (var b = 0; b < batch; b++) {
	    var batchOffset = b * imagesStrides[0];

	    for (var r = 0; r < xHeight; r++) {
	      var rowOffset = batchOffset + r * imagesStrides[1]; // Compute bounds for where in dy we will look

	      var startRLerp = Math.floor(r * invHeightScale);
	      var startDyR = Math.floor(startRLerp - winHeight / 2);

	      for (var c = 0; c < xWidth; c++) {
	        var colOffset = rowOffset + c * imagesStrides[2]; // Compute bounds for where in dy we will look

	        var startCLerp = Math.floor(c * invWidthScale);
	        var startDyC = Math.floor(startCLerp - winWidth / 2);

	        for (var d = 0; d < depth; d++) {
	          var accum = 0; // loop over dy

	          for (var dyRIndex = 0; dyRIndex < winHeight; dyRIndex++) {
	            var dyR = dyRIndex + startDyR; // Guard against the window exceeding the bounds of dy

	            if (dyR < 0 || dyR >= yHeight) {
	              continue;
	            }

	            var dyROffset = batchOffset + dyR * dyStrides[1];
	            var sourceFracRow = dyR * heightScale;
	            var sourceNearestRow = Math.min(xHeight - 1, alignCorners ? Math.round(sourceFracRow) : Math.floor(sourceFracRow));

	            if (r !== sourceNearestRow) {
	              continue;
	            }

	            for (var dyCIndex = 0; dyCIndex < winWidth; dyCIndex++) {
	              var dyC = dyCIndex + startDyC; // Guard against the window exceeding the bounds of dy

	              if (dyC < 0 || dyC >= yWidth) {
	                continue;
	              }

	              var dyCOffset = dyROffset + dyC * dyStrides[2];
	              var sourceFracCol = dyC * widthScale;
	              var sourceNearestCol = Math.min(xWidth - 1, alignCorners ? Math.round(sourceFracCol) : Math.floor(sourceFracCol));

	              if (c === sourceNearestCol) {
	                accum += dyValues[dyCOffset + d];
	              }
	            }
	          }

	          output[colOffset + d] = accum;
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(images.shape, images.dtype, output);
	}