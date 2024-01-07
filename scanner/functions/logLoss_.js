function logLoss_(labels, predictions, weights, epsilon, reduction) {
	  if (epsilon === void 0) {
	    epsilon = 1e-7;
	  }

	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $labels = convertToTensor(labels, 'labels', 'logLoss');
	  var $predictions = convertToTensor(predictions, 'predictions', 'logLoss');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'logLoss');
	  }

	  assertShapesMatch($labels.shape, $predictions.shape, 'Error in logLoss: ');
	  var one = scalar(1);
	  var epsilonScalar = scalar(epsilon);
	  var l1 = neg(mul($labels, log$9(add$1($predictions, epsilonScalar))));
	  var l2 = mul(sub(one, $labels), log$9(add$1(sub(one, $predictions), epsilonScalar)));
	  var losses = sub(l1, l2);
	  return computeWeightedLoss(losses, $weights, reduction);
	}