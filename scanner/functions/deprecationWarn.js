function deprecationWarn(msg) {
	  if (env().getBool('DEPRECATION_WARNINGS_ENABLED')) {
	    console.warn(msg + ' You can disable deprecation warnings with ' + 'tf.disableDeprecationWarnings().');
	  }
	}