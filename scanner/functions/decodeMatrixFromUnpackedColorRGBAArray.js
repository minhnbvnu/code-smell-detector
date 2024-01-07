function decodeMatrixFromUnpackedColorRGBAArray(unpackedArray, matrix, channels) {
	  var requiredSize = unpackedArray.length * channels / 4;

	  if (matrix.length < requiredSize) {
	    throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
	  }

	  var dst = 0;

	  for (var src = 0; src < unpackedArray.length; src += 4) {
	    for (var c = 0; c < channels; c++) {
	      matrix[dst++] = unpackedArray[src + c];
	    }
	  }
	}