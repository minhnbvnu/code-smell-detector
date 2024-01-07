function sigmoidCrossEntropyWithLogits_(labels, logits) {
	  var $labels = convertToTensor(labels, 'labels', 'sigmoidCrossEntropyWithLogits');
	  var $logits = convertToTensor(logits, 'logits', 'sigmoidCrossEntropyWithLogits');
	  assertShapesMatch($labels.shape, $logits.shape, 'Error in sigmoidCrossEntropyWithLogits: ');
	  /**
	   * Implementation Details:
	   *
	   * For brevity, let `x = logits`, `z = labels`.  The logistic loss is
	   *     z * -log(sigmoid(x)) + (1 - z) * -log(1 - sigmoid(x))
	   *   = z * -log(1 / (1 + exp(-x))) + (1 - z) * -log(exp(-x) / (1 + exp(-x)))
	   *   = z * log(1 + exp(-x)) + (1 - z) * (-log(exp(-x)) + log(1 + exp(-x)))
	   *   = z * log(1 + exp(-x)) + (1 - z) * (x + log(1 + exp(-x))
	   *   = (1 - z) * x + log(1 + exp(-x))
	   *   = x - x * z + log(1 + exp(-x))
	   *
	   *   For x < 0, to avoid overflow in exp(-x), we reformulate the above
	   *     x - x * z + log(1 + exp(-x))
	   *   = log(exp(x)) - x * z + log(1 + exp(-x))
	   *   = - x * z + log(1 + exp(x))
	   *
	   * Hence, to ensure stability and avoid overflow, the implementation uses
	   * this equivalent formulation:
	   *     max(x, 0) - x * z + log(1 + exp(-abs(x)))
	   */

	  var maxOutput = relu($logits);
	  var outputXTarget = mul($logits, $labels);
	  var sigmoidOutput = log1p(exp$3(neg(abs$8($logits))));
	  return add$1(sub(maxOutput, outputXTarget), sigmoidOutput);
	}