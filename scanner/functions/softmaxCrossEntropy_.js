function softmaxCrossEntropy_(onehotLabels, logits, weights, labelSmoothing, reduction) {
	  if (labelSmoothing === void 0) {
	    labelSmoothing = 0;
	  }

	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $onehotLabels = convertToTensor(onehotLabels, 'onehotLabels', 'softmaxCrossEntropy');
	  var $logits = convertToTensor(logits, 'logits', 'softmaxCrossEntropy');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'softmaxCrossEntropy');
	  }

	  assertShapesMatch($onehotLabels.shape, $logits.shape, 'Error in softmaxCrossEntropy: ');

	  if (labelSmoothing > 0) {
	    var labelSmoothingScalar = scalar(labelSmoothing);
	    var one = scalar(1);
	    var numClasses = scalar($onehotLabels.shape[1]);
	    $onehotLabels = add$1(mul($onehotLabels, sub(one, labelSmoothingScalar)), div(labelSmoothingScalar, numClasses));
	  }

	  var losses = softmaxCrossEntropyWithLogits_($onehotLabels, $logits);
	  return computeWeightedLoss(losses, $weights, reduction);
	}