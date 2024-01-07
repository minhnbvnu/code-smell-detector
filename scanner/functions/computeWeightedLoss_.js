function computeWeightedLoss_(losses, weights, reduction) {
	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $losses = convertToTensor(losses, 'losses', 'computeWeightedLoss');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'computeWeightedLoss');
	  }

	  var weightedLoss = $weights == null ? $losses : mul($losses, $weights);

	  if (reduction === exports.Reduction.NONE) {
	    return weightedLoss;
	  }

	  if (reduction === exports.Reduction.SUM) {
	    return sum$1(weightedLoss);
	  }

	  if (reduction === exports.Reduction.MEAN) {
	    if ($weights == null) {
	      return mean(weightedLoss);
	    } else {
	      var broadcastFactor = $losses.size / $weights.size;
	      var result = div(sum$1(weightedLoss), sum$1($weights));
	      return broadcastFactor > 1 ? div(result, scalar(broadcastFactor)) : result;
	    }
	  }

	  if (reduction === exports.Reduction.SUM_BY_NONZERO_WEIGHTS) {
	    if ($weights == null) {
	      return div(sum$1(weightedLoss), scalar($losses.size));
	    } else {
	      var broadcastedWeights = mul($weights, ones$1($losses.shape));
	      var numNonZeros = cast(sum$1(notEqual(broadcastedWeights, scalar(0))), 'float32');
	      return div(sum$1(weightedLoss), numNonZeros);
	    }
	  }

	  throw Error("Unknown reduction: " + reduction);
	}