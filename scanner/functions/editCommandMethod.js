function editCommandMethod(command, prop, range, callback) {
		var ret;

		// Set up our global range magic, but only if we're the outermost function
		if (executionStackDepth === 0) {
			globalRange = range;
		}

		executionStackDepth++;
		try {
			ret = callback();
		} catch (e) {
			executionStackDepth--;
			throw e;
		}
		executionStackDepth--;
		return ret;
	}