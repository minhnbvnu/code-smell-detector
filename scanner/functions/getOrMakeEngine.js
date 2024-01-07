function getOrMakeEngine() {
	  var ns = getGlobalNamespace();

	  if (ns._tfengine == null) {
	    var environment = new Environment(ns);
	    ns._tfengine = new Engine(environment);
	  }

	  setEnvironmentGlobal(ns._tfengine.ENV); // Tell the current tensor interface that the global engine is responsible
	  // for tracking.

	  setTensorTracker(function () {
	    return ns._tfengine;
	  });
	  return ns._tfengine;
	}