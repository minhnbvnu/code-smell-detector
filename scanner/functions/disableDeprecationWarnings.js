function disableDeprecationWarnings() {
	  env().set('DEPRECATION_WARNINGS_ENABLED', false);
	  console.warn("TensorFlow.js deprecation warnings have been disabled.");
	}