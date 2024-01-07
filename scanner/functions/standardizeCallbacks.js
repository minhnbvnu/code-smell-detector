function standardizeCallbacks(callbacks, yieldEvery) {
	  if (callbacks == null) {
	    callbacks = {};
	  }

	  if (callbacks instanceof BaseCallback) {
	    return [callbacks];
	  }

	  if (Array.isArray(callbacks) && callbacks[0] instanceof BaseCallback) {
	    return callbacks;
	  } // Convert custom callback configs to custom callback objects.


	  var callbackConfigs = toList(callbacks);
	  return callbackConfigs.map(function (callbackConfig) {
	    return new CustomCallback(callbackConfig, yieldEvery);
	  });
	}