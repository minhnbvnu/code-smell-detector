function nonMaxSuppressionWithScore_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
	  if (iouThreshold === void 0) {
	    iouThreshold = 0.5;
	  }

	  if (scoreThreshold === void 0) {
	    scoreThreshold = Number.NEGATIVE_INFINITY;
	  }

	  if (softNmsSigma === void 0) {
	    softNmsSigma = 0.0;
	  }

	  var $boxes = convertToTensor(boxes, 'boxes', 'nonMaxSuppression');
	  var $scores = convertToTensor(scores, 'scores', 'nonMaxSuppression');
	  var params = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
	  maxOutputSize = params.maxOutputSize;
	  iouThreshold = params.iouThreshold;
	  scoreThreshold = params.scoreThreshold;
	  softNmsSigma = params.softNmsSigma;
	  var inputs = {
	    boxes: $boxes,
	    scores: $scores
	  };
	  var attrs = {
	    maxOutputSize: maxOutputSize,
	    iouThreshold: iouThreshold,
	    scoreThreshold: scoreThreshold,
	    softNmsSigma: softNmsSigma
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var result = ENGINE.runKernel(NonMaxSuppressionV5, inputs, attrs);
	  return {
	    selectedIndices: result[0],
	    selectedScores: result[1]
	  };
	}