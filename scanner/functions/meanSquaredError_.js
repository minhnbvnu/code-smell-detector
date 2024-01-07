function meanSquaredError_(labels, predictions, weights, reduction) {
	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $labels = convertToTensor(labels, 'labels', 'meanSquaredError');
	  var $predictions = convertToTensor(predictions, 'predictions', 'meanSquaredError');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'meanSquaredError');
	  }

	  assertShapesMatch($labels.shape, $predictions.shape, 'Error in meanSquaredError: ');
	  var losses = squaredDifference($labels, $predictions);
	  return computeWeightedLoss(losses, $weights, reduction);
	}