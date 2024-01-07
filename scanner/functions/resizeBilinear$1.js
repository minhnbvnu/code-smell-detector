function resizeBilinear$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images;
	  var alignCorners = attrs.alignCorners,
	      halfPixelCenters = attrs.halfPixelCenters,
	      size = attrs.size;
	  assertNotComplex(images, 'resizeBilinear');
	  var imagesStrides = computeStrides(images.shape);
	  var newHeight = size[0],
	      newWidth = size[1];
	  var _images$shape = images.shape,
	      batch = _images$shape[0],
	      oldHeight = _images$shape[1],
	      oldWidth = _images$shape[2],
	      numChannels = _images$shape[3];
	  var xValues = backend.data.get(images.dataId).values;
	  var result = new Float32Array(sizeFromShape([batch, newHeight, newWidth, numChannels]));
	  var effectiveInputSize = [alignCorners && newHeight > 1 ? oldHeight - 1 : oldHeight, alignCorners && newWidth > 1 ? oldWidth - 1 : oldWidth];
	  var effectiveOutputSize = [alignCorners && newHeight > 1 ? newHeight - 1 : newHeight, alignCorners && newWidth > 1 ? newWidth - 1 : newWidth];
	  var outputIdx = 0;
	  var effectiveRowSizeRatio = effectiveInputSize[0] / effectiveOutputSize[0];
	  var effectiveColSizeRatio = effectiveInputSize[1] / effectiveOutputSize[1];

	  for (var b = 0; b < batch; b++) {
	    for (var r = 0; r < newHeight; r++) {
	      var sourceFracRow = void 0;

	      if (halfPixelCenters) {
	        sourceFracRow = effectiveRowSizeRatio * (r + 0.5) - 0.5;
	      } else {
	        sourceFracRow = effectiveRowSizeRatio * r;
	      }

	      var sourceRowFloor = Math.max(0, Math.floor(sourceFracRow));
	      var rowFrac = sourceFracRow - sourceRowFloor;
	      var sourceRowCeil = Math.min(oldHeight - 1, Math.ceil(sourceFracRow));
	      var topRowOffset = b * imagesStrides[0] + sourceRowFloor * imagesStrides[1];
	      var botRowOffset = b * imagesStrides[0] + sourceRowCeil * imagesStrides[1];

	      for (var c = 0; c < newWidth; c++) {
	        var sourceFracCol = void 0;

	        if (halfPixelCenters) {
	          sourceFracCol = effectiveColSizeRatio * (c + 0.5) - 0.5;
	        } else {
	          sourceFracCol = effectiveColSizeRatio * c;
	        }

	        var sourceColFloor = Math.max(0, Math.floor(sourceFracCol));
	        var colFrac = sourceFracCol - sourceColFloor;
	        var sourceColCeil = Math.min(oldWidth - 1, Math.ceil(sourceFracCol));
	        var topLeftOffest = topRowOffset + sourceColFloor * imagesStrides[2];
	        var botLeftOffset = botRowOffset + sourceColFloor * imagesStrides[2];
	        var topRightOffset = topRowOffset + sourceColCeil * imagesStrides[2];
	        var botRightOffest = botRowOffset + sourceColCeil * imagesStrides[2];

	        for (var d = 0; d < numChannels; d++) {
	          // Begin shader.
	          // Compute the fractional index of the source.
	          var topLeft = xValues[topLeftOffest + d];
	          var bottomLeft = xValues[botLeftOffset + d];
	          var topRight = xValues[topRightOffset + d];
	          var bottomRight = xValues[botRightOffest + d];
	          var top = topLeft + (topRight - topLeft) * colFrac;
	          var bottom = bottomLeft + (bottomRight - bottomLeft) * colFrac;
	          var newValue = top + (bottom - top) * rowFrac;
	          result[outputIdx++] = newValue;
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo([batch, newHeight, newWidth, numChannels], 'float32', result);
	}