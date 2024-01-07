function normalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
	  if (epsilon === void 0) {
	    epsilon = 1e-3;
	  }

	  if (arraysEqual(reductionAxes.slice().sort(), range$1(0, x.rank - 1))) {
	    return regularNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon);
	  } else {
	    return broadcastNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon);
	  }
	}