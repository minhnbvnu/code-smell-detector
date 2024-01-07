function getTextureShapeFromLogicalShape(logShape, isPacked) {
	  if (isPacked === void 0) {
	    isPacked = false;
	  }

	  var maxTexSize = env().getNumber('WEBGL_MAX_TEXTURE_SIZE');

	  if (isPacked) {
	    maxTexSize = maxTexSize * 2; // This logic ensures we accurately count the number of packed texels needed
	    // to accommodate the tensor. We can only pack values in the same texel if
	    // they are from adjacent pairs of rows/cols within the same batch. So if a
	    // tensor has 3 rows, we pretend it has 4 rows in order to account for the
	    // fact that the texels containing the third row are half empty.

	    logShape = logShape.map(function (d, i) {
	      return i >= logShape.length - 2 ? nearestLargerEven(logShape[i]) : logShape[i];
	    }); // Packed texture height is at least 2 (the channel height of a single
	    // texel).

	    if (logShape.length === 1) {
	      logShape = [2, logShape[0]];
	    }
	  } // If logical shape is 2, we don't squeeze, since we want to match physical.


	  if (logShape.length !== 2) {
	    var squeezeResult = squeezeShape(logShape);
	    logShape = squeezeResult.newShape;
	  }

	  var size = sizeFromShape(logShape);

	  if (logShape.length <= 1 && size <= maxTexSize) {
	    return [1, size];
	  } else if (logShape.length === 2 && logShape[0] <= maxTexSize && logShape[1] <= maxTexSize) {
	    return logShape;
	  } else if (logShape.length === 3 && logShape[0] * logShape[1] <= maxTexSize && logShape[2] <= maxTexSize) {
	    return [logShape[0] * logShape[1], logShape[2]];
	  } else if (logShape.length === 3 && logShape[0] <= maxTexSize && logShape[1] * logShape[2] <= maxTexSize) {
	    return [logShape[0], logShape[1] * logShape[2]];
	  } else if (logShape.length === 4 && logShape[0] * logShape[1] * logShape[2] <= maxTexSize && logShape[3] <= maxTexSize) {
	    return [logShape[0] * logShape[1] * logShape[2], logShape[3]];
	  } else if (logShape.length === 4 && logShape[0] <= maxTexSize && logShape[1] * logShape[2] * logShape[3] <= maxTexSize) {
	    return [logShape[0], logShape[1] * logShape[2] * logShape[3]];
	  } else {
	    if (isPacked) {
	      // For packed textures size equals the number of channels required to
	      // accommodate the texture data. However in order to squarify such that
	      // inner dimensions stay even, we rewrite size to equal the number of
	      // texels. Then in the return statement we rehydrate the squarified
	      // dimensions to channel units.
	      var batchDim = getBatchDim(logShape);
	      var rows = 2,
	          cols = 2;

	      if (logShape.length) {
	        var _getRowsCols = getRowsCols(logShape);

	        rows = _getRowsCols[0];
	        cols = _getRowsCols[1];
	      }

	      size = batchDim * (rows / 2) * (cols / 2);
	      return sizeToSquarishShape(size).map(function (d) {
	        return d * 2;
	      });
	    }

	    return sizeToSquarishShape(size);
	  }
	}