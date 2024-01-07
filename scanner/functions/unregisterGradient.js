function unregisterGradient(kernelName) {
	  if (!gradRegistry.has(kernelName)) {
	    throw new Error("The gradient '" + kernelName + "' for backend is not registered");
	  }

	  gradRegistry.delete(kernelName);
	}