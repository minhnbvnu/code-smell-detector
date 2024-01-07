function resizeNearestNeighbor$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images;
	  var alignCorners = attrs.alignCorners,
	      halfPixelCenters = attrs.halfPixelCenters,
	      size = attrs.size;
	  assertNotComplex(images, 'resizeNearestNeighbor');
	  var imagesStrides = computeStrides(images.shape);
	  var newHeight = size[0],
	      newWidth = size[1];
	  var _images$shape = images.shape,
	      batch = _images$shape[0],
	      oldHeight = _images$shape[1],
	      oldWidth = _images$shape[2],
	      numChannels = _images$shape[3];
	  var xValues = backend.data.get(images.dataId).values;
	  var output = new Float32Array(batch * newHeight * newWidth * numChannels);
	  var effectiveInputSize = [alignCorners && newHeight > 1 ? oldHeight - 1 : oldHeight, alignCorners && newWidth > 1 ? oldWidth - 1 : oldWidth];
	  var effectiveOutputSize = [alignCorners && newHeight > 1 ? newHeight - 1 : newHeight, alignCorners && newWidth > 1 ? newWidth - 1 : newWidth];
	  var effectiveRowSizeRatio = effectiveInputSize[0] / effectiveOutputSize[0];
	  var effectiveColSizeRatio = effectiveInputSize[1] / effectiveOutputSize[1];
	  var outputOffset = 0;

	  for (var b = 0; b < batch; b++) {
	    var batchOffset = b * imagesStrides[0];

	    for (var r = 0; r < newHeight; r++) {
	      var sourceFracRow = halfPixelCenters ? effectiveRowSizeRatio * (r + 0.5) : effectiveRowSizeRatio * r;
	      var sourceNearestRow = Math.min(oldHeight - 1, alignCorners ? Math.round(sourceFracRow) : Math.floor(sourceFracRow));

	      if (halfPixelCenters) {
	        sourceNearestRow = Math.max(0, sourceNearestRow);
	      }

	      var rowOffset = batchOffset + sourceNearestRow * imagesStrides[1];

	      for (var c = 0; c < newWidth; c++) {
	        var sourceFracCol = halfPixelCenters ? effectiveColSizeRatio * (c + 0.5) : effectiveColSizeRatio * c;
	        var sourceNearestCol = Math.min(oldWidth - 1, alignCorners ? Math.round(sourceFracCol) : Math.floor(sourceFracCol));

	        if (halfPixelCenters) {
	          sourceNearestCol = Math.max(0, sourceNearestCol);
	        }

	        var colOffset = rowOffset + sourceNearestCol * imagesStrides[2];

	        for (var d = 0; d < numChannels; d++) {
	          // Begin shader.
	          // Compute the fractional index of the source.
	          var newVal = xValues[colOffset + d];
	          output[outputOffset++] = newVal;
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo([batch, newHeight, newWidth, numChannels], images.dtype, output);
	}