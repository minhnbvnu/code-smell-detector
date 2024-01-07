function cosineDistance_(labels, predictions, axis, weights, reduction) {
	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $labels = convertToTensor(labels, 'labels', 'cosineDistance');
	  var $predictions = convertToTensor(predictions, 'predictions', 'cosineDistance');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'cosineDistance');
	  }

	  assertShapesMatch($labels.shape, $predictions.shape, 'Error in cosineDistance: ');
	  var one = scalar(1);
	  var losses = sub(one, sum$1(mul($labels, $predictions), axis, true));
	  return computeWeightedLoss(losses, $weights, reduction);
	}