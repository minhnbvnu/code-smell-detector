function regularNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
	  if (epsilon === void 0) {
	    epsilon = 1e-3;
	  }

	  return tidy(function () {
	    var meanAndVariance = moments(x, reductionAxes);
	    var mean = meanAndVariance.mean;
	    var variance = meanAndVariance.variance;
	    var normed = batchNormalization(x, mean, variance, beta, gamma, epsilon);
	    return [normed, mean, variance];
	  });
	}