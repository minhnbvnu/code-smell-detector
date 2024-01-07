function configureCallbacks(callbacks, verbose, epochs, initialEpoch, numTrainSamples, stepsPerEpoch, batchSize, doValidation, callbackMetrics) {
	  var history = new History();
	  var actualCallbacks = [new BaseLogger()].concat(CallbackConstructorRegistry.createCallbacks(verbose));

	  if (callbacks != null) {
	    actualCallbacks.push.apply(actualCallbacks, callbacks);
	  }

	  actualCallbacks.push(history);
	  var callbackList = new CallbackList(actualCallbacks); // TODO(cais): Figure out when this LayersModel instance can have a
	  // dynamically
	  //   set property called 'callback_model' as in PyKeras.

	  callbackList.setParams({
	    epochs: epochs,
	    initialEpoch: initialEpoch,
	    samples: numTrainSamples,
	    steps: stepsPerEpoch,
	    batchSize: batchSize,
	    verbose: verbose,
	    doValidation: doValidation,
	    metrics: callbackMetrics
	  });
	  return {
	    callbackList: callbackList,
	    history: history
	  };
	}