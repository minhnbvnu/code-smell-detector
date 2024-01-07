function registerKernel(config) {
	  var kernelName = config.kernelName,
	      backendName = config.backendName;
	  var key = makeKey(kernelName, backendName);

	  if (kernelRegistry.has(key)) {
	    console.warn("The kernel '" + kernelName + "' for backend " + ("'" + backendName + "' is already registered"));
	  }

	  kernelRegistry.set(key, config);
	}