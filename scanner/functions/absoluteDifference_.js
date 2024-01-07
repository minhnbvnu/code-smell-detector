function absoluteDifference_(labels, predictions, weights, reduction) {
	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $labels = convertToTensor(labels, 'labels', 'absoluteDifference');
	  var $predictions = convertToTensor(predictions, 'predictions', 'absoluteDifference');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'absoluteDifference');
	  }

	  assertShapesMatch($labels.shape, $predictions.shape, 'Error in absoluteDifference: ');
	  var losses = abs$8(sub($labels, $predictions));
	  return computeWeightedLoss(losses, $weights, reduction);
	}