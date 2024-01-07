function computeOutputShape4D(inShape, fieldSize, outChannels, stride, zeroPad, roundingMode) {
	  if (zeroPad == null) {
	    zeroPad = computeDefaultPad(inShape, fieldSize, stride);
	  }

	  var inputDepth = inShape[0];
	  var inputRows = inShape[1];
	  var inputCols = inShape[2];
	  var outputDepths = round((inputDepth - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
	  var outputRows = round((inputRows - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
	  var outputCols = round((inputCols - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
	  return [outputDepths, outputRows, outputCols, outChannels];
	}