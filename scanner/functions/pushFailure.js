function pushFailure() {
  	if (!config.current) {
  		throw new Error("pushFailure() assertion outside test context, in " + sourceFromStacktrace(2));
  	}

  	// Gets current test obj
  	var currentTest = config.current;

  	return currentTest.pushFailure.apply(currentTest, arguments);
  }