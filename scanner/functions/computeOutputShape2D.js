function computeOutputShape2D(inShape, fieldSize, stride, zeroPad, roundingMode) {
	  if (zeroPad == null) {
	    zeroPad = computeDefaultPad(inShape, fieldSize, stride);
	  }

	  var inputRows = inShape[0];
	  var inputCols = inShape[1];
	  var outputRows = round((inputRows - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
	  var outputCols = round((inputCols - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
	  return [outputRows, outputCols];
	}