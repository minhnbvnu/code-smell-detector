function countTrainableParams(model) {
	  var trainableCount; // tslint:disable:no-any

	  if (model.collectedTrainableWeights != null) {
	    trainableCount = countParamsInWeights(model.collectedTrainableWeights);
	  } else {
	    trainableCount = countParamsInWeights(model.trainableWeights);
	  } // tslint:enable:no-any


	  return trainableCount;
	}