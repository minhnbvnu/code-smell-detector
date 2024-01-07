function nonMaxSuppSanityCheck(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma) {
	  if (iouThreshold == null) {
	    iouThreshold = 0.5;
	  }

	  if (scoreThreshold == null) {
	    scoreThreshold = Number.NEGATIVE_INFINITY;
	  }

	  if (softNmsSigma == null) {
	    softNmsSigma = 0.0;
	  }

	  var numBoxes = boxes.shape[0];
	  maxOutputSize = Math.min(maxOutputSize, numBoxes);
	  assert(0 <= iouThreshold && iouThreshold <= 1, function () {
	    return "iouThreshold must be in [0, 1], but was '" + iouThreshold + "'";
	  });
	  assert(boxes.rank === 2, function () {
	    return "boxes must be a 2D tensor, but was of rank '" + boxes.rank + "'";
	  });
	  assert(boxes.shape[1] === 4, function () {
	    return "boxes must have 4 columns, but 2nd dimension was " + boxes.shape[1];
	  });
	  assert(scores.rank === 1, function () {
	    return 'scores must be a 1D tensor';
	  });
	  assert(scores.shape[0] === numBoxes, function () {
	    return "scores has incompatible shape with boxes. Expected " + numBoxes + ", " + ("but was " + scores.shape[0]);
	  });
	  assert(0 <= softNmsSigma && softNmsSigma <= 1, function () {
	    return "softNmsSigma must be in [0, 1], but was '" + softNmsSigma + "'";
	  });
	  return {
	    maxOutputSize: maxOutputSize,
	    iouThreshold: iouThreshold,
	    scoreThreshold: scoreThreshold,
	    softNmsSigma: softNmsSigma
	  };
	}