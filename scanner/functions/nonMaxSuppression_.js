function nonMaxSuppression_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
	  if (iouThreshold === void 0) {
	    iouThreshold = 0.5;
	  }

	  if (scoreThreshold === void 0) {
	    scoreThreshold = Number.NEGATIVE_INFINITY;
	  }

	  var $boxes = convertToTensor(boxes, 'boxes', 'nonMaxSuppression');
	  var $scores = convertToTensor(scores, 'scores', 'nonMaxSuppression');
	  var inputs = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold);
	  maxOutputSize = inputs.maxOutputSize;
	  iouThreshold = inputs.iouThreshold;
	  scoreThreshold = inputs.scoreThreshold;
	  var attrs = {
	    maxOutputSize: maxOutputSize,
	    iouThreshold: iouThreshold,
	    scoreThreshold: scoreThreshold
	  };
	  return ENGINE.runKernel(NonMaxSuppressionV3, {
	    boxes: $boxes,
	    scores: $scores
	  }, attrs);
	}