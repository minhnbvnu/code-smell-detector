function categoricalCrossentropy(target, output, fromLogits) {
	  if (fromLogits === void 0) {
	    fromLogits = false;
	  }

	  return tidy(function () {
	    if (fromLogits) {
	      output = softmax(output);
	    } else {
	      // scale preds so that the class probabilities of each sample sum to 1.
	      var outputSum = sum$1(output, output.shape.length - 1, true);
	      output = div(output, outputSum);
	    }

	    output = clipByValue(output, epsilon(), 1 - epsilon());
	    return neg(sum$1(mul(target.toFloat(), log$9(output)), output.shape.length - 1));
	  });
	}