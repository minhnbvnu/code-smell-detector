function confusionMatrix_(labels, predictions, numClasses) {
	  var $labels = convertToTensor(labels, 'labels', 'confusionMatrix');
	  var $predictions = convertToTensor(predictions, 'predictions', 'confusionMatrix');
	  assert(numClasses == null || numClasses > 0 && Number.isInteger(numClasses), function () {
	    return "If provided, numClasses must be a positive integer, " + ("but got " + numClasses);
	  });
	  assert($labels.rank === 1, function () {
	    return "Expected the rank of labels to be 1, but got " + $labels.rank;
	  });
	  assert($predictions.rank === 1, function () {
	    return "Expected the rank of predictions to be 1, " + ("but got " + $predictions.rank);
	  });
	  assert($labels.shape[0] === $predictions.shape[0], function () {
	    return "Mismatch in the number of examples: " + ($labels.shape[0] + " vs. " + $predictions.shape[0] + ". ") + "Labels and predictions should have the same number of elements.";
	  });
	  assert(numClasses > 0 && Number.isInteger(numClasses), function () {
	    return "numClasses is required to be a positive integer, but got " + ("" + numClasses);
	  }); // TODO(cais): In the future, if oneHot supports tensors inputs for
	  //   `numClasses`, `confusionMatrix` can make `numClasses` optional.

	  var oneHotLabels = oneHot(cast($labels, 'int32'), numClasses);
	  var oneHotPredictions = oneHot(cast($predictions, 'int32'), numClasses);
	  var oneHotLabelsT = transpose(oneHotLabels);
	  var product = matMul(oneHotLabelsT, oneHotPredictions);
	  return cast(product, 'int32');
	}