function getKernel(kernelName, backendName) {
	  var key = makeKey(kernelName, backendName);
	  return kernelRegistry.get(key);
	}