function huberLoss_(labels, predictions, weights, delta, reduction) {
	  if (delta === void 0) {
	    delta = 1.0;
	  }

	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $labels = convertToTensor(labels, 'labels', 'huberLoss');
	  var $predictions = convertToTensor(predictions, 'predictions', 'huberLoss');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'huberLoss');
	  }

	  assertShapesMatch($labels.shape, $predictions.shape, 'Error in huberLoss: ');
	  var deltaScalar = scalar(delta);
	  var error = abs$8(sub($predictions, $labels));
	  var quadratic = minimum(error, deltaScalar);
	  var linear = sub(error, quadratic);
	  var losses = add$1(mul(scalar(0.5), square(quadratic)), mul(deltaScalar, linear));
	  return computeWeightedLoss(losses, $weights, reduction);
	}