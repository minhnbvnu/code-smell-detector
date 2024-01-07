function registerBackend(name, factory, priority) {
	  if (priority === void 0) {
	    priority = 1;
	  }

	  return ENGINE.registerBackend(name, factory, priority);
	}