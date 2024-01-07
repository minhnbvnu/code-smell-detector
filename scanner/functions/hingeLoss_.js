function hingeLoss_(labels, predictions, weights, reduction) {
	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $labels = convertToTensor(labels, 'labels', 'hingeLoss');
	  var $predictions = convertToTensor(predictions, 'predictions', 'hingeLoss');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'hingeLoss');
	  }

	  assertShapesMatch($labels.shape, $predictions.shape, 'Error in hingeLoss: ');
	  var one = scalar(1); // Convert binary labels to (-1, 1)

	  $labels = sub(mul(scalar(2), $labels), one);
	  var losses = relu(sub(one, mul($labels, $predictions)));
	  return computeWeightedLoss(losses, $weights, reduction);
	}