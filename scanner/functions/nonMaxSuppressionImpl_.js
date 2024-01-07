function nonMaxSuppressionImpl_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma, returnScoresTensor, padToMaxOutputSize, returnValidOutputs) {
	  if (returnScoresTensor === void 0) {
	    returnScoresTensor = false;
	  }

	  if (padToMaxOutputSize === void 0) {
	    padToMaxOutputSize = false;
	  }

	  if (returnValidOutputs === void 0) {
	    returnValidOutputs = false;
	  }

	  // The list is sorted in ascending order, so that we can always pop the
	  // candidate with the largest score in O(1) time.
	  var candidates = [];

	  for (var i = 0; i < scores.length; i++) {
	    if (scores[i] > scoreThreshold) {
	      candidates.push({
	        score: scores[i],
	        boxIndex: i,
	        suppressBeginIndex: 0
	      });
	    }
	  }

	  candidates.sort(ascendingComparator); // If softNmsSigma is 0, the outcome of this algorithm is exactly same as
	  // before.

	  var scale = softNmsSigma > 0 ? -0.5 / softNmsSigma : 0.0;
	  var selectedIndices = [];
	  var selectedScores = [];

	  while (selectedIndices.length < maxOutputSize && candidates.length > 0) {
	    var candidate = candidates.pop();
	    var originalScore = candidate.score,
	        boxIndex = candidate.boxIndex,
	        suppressBeginIndex = candidate.suppressBeginIndex;

	    if (originalScore < scoreThreshold) {
	      break;
	    } // Overlapping boxes are likely to have similar scores, therefore we
	    // iterate through the previously selected boxes backwards in order to
	    // see if candidate's score should be suppressed. We use
	    // suppressBeginIndex to track and ensure a candidate can be suppressed
	    // by a selected box no more than once. Also, if the overlap exceeds
	    // iouThreshold, we simply ignore the candidate.


	    var ignoreCandidate = false;

	    for (var j = selectedIndices.length - 1; j >= suppressBeginIndex; --j) {
	      var iou = intersectionOverUnion(boxes, boxIndex, selectedIndices[j]);

	      if (iou >= iouThreshold) {
	        ignoreCandidate = true;
	        break;
	      }

	      candidate.score = candidate.score * suppressWeight(iouThreshold, scale, iou);

	      if (candidate.score <= scoreThreshold) {
	        break;
	      }
	    } // At this point, if `candidate.score` has not dropped below
	    // `scoreThreshold`, then we know that we went through all of the
	    // previous selections and can safely update `suppressBeginIndex` to the
	    // end of the selected array. Then we can re-insert the candidate with
	    // the updated score and suppressBeginIndex back in the candidate list.
	    // If on the other hand, `candidate.score` has dropped below the score
	    // threshold, we will not add it back to the candidates list.


	    candidate.suppressBeginIndex = selectedIndices.length;

	    if (!ignoreCandidate) {
	      // Candidate has passed all the tests, and is not suppressed, so
	      // select the candidate.
	      if (candidate.score === originalScore) {
	        selectedIndices.push(boxIndex);
	        selectedScores.push(candidate.score);
	      } else if (candidate.score > scoreThreshold) {
	        // Candidate's score is suppressed but is still high enough to be
	        // considered, so add back to the candidates list.
	        binaryInsert(candidates, candidate, ascendingComparator);
	      }
	    }
	  } // NonMaxSuppressionV4 feature: padding output to maxOutputSize.


	  var validOutputs = selectedIndices.length;
	  var elemsToPad = maxOutputSize - validOutputs;

	  if (padToMaxOutputSize && elemsToPad > 0) {
	    selectedIndices.push.apply(selectedIndices, new Array(elemsToPad).fill(0));
	    selectedScores.push.apply(selectedScores, new Array(elemsToPad).fill(0.0));
	  }

	  var result = {
	    selectedIndices: selectedIndices
	  };

	  if (returnScoresTensor) {
	    result['selectedScores'] = selectedScores;
	  }

	  if (returnValidOutputs) {
	    result['validOutputs'] = validOutputs;
	  }

	  return result;
	}