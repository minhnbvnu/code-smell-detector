function nonMaxSuppressionPadded_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize) {
	  if (iouThreshold === void 0) {
	    iouThreshold = 0.5;
	  }

	  if (scoreThreshold === void 0) {
	    scoreThreshold = Number.NEGATIVE_INFINITY;
	  }

	  if (padToMaxOutputSize === void 0) {
	    padToMaxOutputSize = false;
	  }

	  var $boxes = convertToTensor(boxes, 'boxes', 'nonMaxSuppression');
	  var $scores = convertToTensor(scores, 'scores', 'nonMaxSuppression');
	  var params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, null
	  /* softNmsSigma */
	  );
	  var $maxOutputSize = params.maxOutputSize;
	  var $iouThreshold = params.iouThreshold;
	  var $scoreThreshold = params.scoreThreshold;
	  var inputs = {
	    boxes: $boxes,
	    scores: $scores
	  };
	  var attrs = {
	    maxOutputSize: $maxOutputSize,
	    iouThreshold: $iouThreshold,
	    scoreThreshold: $scoreThreshold,
	    padToMaxOutputSize: padToMaxOutputSize
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var result = ENGINE.runKernel(NonMaxSuppressionV4, inputs, attrs);
	  return {
	    selectedIndices: result[0],
	    validOutputs: result[1]
	  };
	}