function unregisterKernel(kernelName, backendName) {
	  var key = makeKey(kernelName, backendName);

	  if (!kernelRegistry.has(key)) {
	    throw new Error("The kernel '" + kernelName + "' for backend " + ("'" + backendName + "' is not registered"));
	  }

	  kernelRegistry.delete(key);
	}