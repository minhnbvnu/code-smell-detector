function nonMaxSuppressionV4Impl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize) {
	  return nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, 0
	  /* softNmsSigma */
	  , false
	  /* returnScoresTensor */
	  , padToMaxOutputSize
	  /* padToMaxOutputSize */
	  , true
	  /* returnValidOutputs */
	  );
	}