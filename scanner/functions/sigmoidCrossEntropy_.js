function sigmoidCrossEntropy_(multiClassLabels, logits, weights, labelSmoothing, reduction) {
	  if (labelSmoothing === void 0) {
	    labelSmoothing = 0;
	  }

	  if (reduction === void 0) {
	    reduction = exports.Reduction.SUM_BY_NONZERO_WEIGHTS;
	  }

	  var $multiClassLabels = convertToTensor(multiClassLabels, 'multiClassLabels', 'sigmoidCrossEntropy');
	  var $logits = convertToTensor(logits, 'logits', 'sigmoidCrossEntropy');
	  var $weights = null;

	  if (weights != null) {
	    $weights = convertToTensor(weights, 'weights', 'sigmoidCrossEntropy');
	  }

	  assertShapesMatch($multiClassLabels.shape, $logits.shape, 'Error in sigmoidCrossEntropy: ');

	  if (labelSmoothing > 0) {
	    var labelSmoothingScalar = scalar(labelSmoothing);
	    var one = scalar(1);
	    var half = scalar(0.5);
	    $multiClassLabels = add$1(mul($multiClassLabels, sub(one, labelSmoothingScalar)), mul(half, labelSmoothingScalar));
	  }

	  var losses = sigmoidCrossEntropyWithLogits_($multiClassLabels, $logits);
	  return computeWeightedLoss(losses, $weights, reduction);
	}