function sparseCategoricalCrossentropy(target, output, fromLogits) {
	  if (fromLogits === void 0) {
	    fromLogits = false;
	  }

	  return tidy(function () {
	    var flatTarget = floor$a(flatten$1(target)).toInt();
	    output = clipByValue(output, epsilon(), 1 - epsilon());
	    var outputShape = output.shape;
	    var oneHotTarget = oneHot(flatTarget, outputShape[outputShape.length - 1]).reshape(outputShape);
	    return categoricalCrossentropy(oneHotTarget, output, fromLogits);
	  });
	}