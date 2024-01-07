function sigmoidCrossEntropyWithLogits(labels, logits) {
	  if (!arraysEqual(labels.shape, logits.shape)) {
	    throw new ValueError("logits and labels must have the same shape, but got shapes " + (JSON.stringify(labels.shape) + " and " + JSON.stringify(logits.shape)));
	  }

	  return tidy(function () {
	    // The logistic loss formula from above is
	    //   x - x * z + log(1 + exp(-x))
	    // For x < 0, a more numerically stable formula is
	    //   -x * z + log(1 + exp(x))
	    // Note that these two expressions can be combined into the following:
	    //   max(x, 0) - x * z + log(1 + exp(-abs(x)))
	    var reluLogits = logits.relu();
	    var negAbsLogits = logits.abs().neg();
	    return reluLogits.sub(logits.mul(labels)).add(negAbsLogits.exp().log1p());
	  });
	}