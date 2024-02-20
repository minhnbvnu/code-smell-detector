function callbacksFor(object) {
	  var callbacks = object._promiseCallbacks;

	  if (!callbacks) {
	    callbacks = object._promiseCallbacks = {};
	  }

	  return callbacks;
	}