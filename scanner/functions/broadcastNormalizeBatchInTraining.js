function broadcastNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
	  if (epsilon === void 0) {
	    epsilon = 1e-3;
	  }

	  return tidy(function () {
	    var meanAndVariance = moments(x, reductionAxes);
	    var mean = meanAndVariance.mean;
	    var variance = meanAndVariance.variance;
	    var targetShape = [];

	    for (var _iterator = _createForOfIteratorHelperLoose(range$1(0, x.rank)), _step; !(_step = _iterator()).done;) {
	      var axis = _step.value;

	      if (reductionAxes.indexOf(axis) !== -1) {
	        targetShape.push(1);
	      } else {
	        targetShape.push(x.shape[axis]);
	      }
	    }

	    var broadcastMean = mean.reshape(targetShape);
	    var broadcastVariance = variance.reshape(targetShape);
	    var broadcastGamma = gamma == null ? null : gamma.reshape(targetShape);
	    var broadcastBeta = beta == null ? null : beta.reshape(targetShape);
	    var normed = batchNormalization(x, broadcastMean, broadcastVariance, broadcastBeta, broadcastGamma, epsilon);
	    return [normed, mean, variance];
	  });
	}