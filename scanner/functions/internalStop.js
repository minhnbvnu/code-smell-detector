function internalStop(test) {
  	var released = false;

  	test.semaphore += 1;
  	config.blocking = true;

  	// Set a recovery timeout, if so configured.
  	if (config.testTimeout && defined.setTimeout) {
  		clearTimeout(config.timeout);
  		config.timeout = setTimeout(function () {
  			pushFailure("Test timed out", sourceFromStacktrace(2));
  			internalRecover(test);
  		}, config.testTimeout);
  	}

  	return function resume() {
  		if (released) {
  			return;
  		}

  		released = true;
  		test.semaphore -= 1;
  		internalStart(test);
  	};
  }