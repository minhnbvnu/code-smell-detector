function copyRegisteredKernels(registeredBackendName, newBackendName) {
	  var kernels = getKernelsForBackend(registeredBackendName);
	  kernels.forEach(function (kernelConfig) {
	    var newKernelConfig = Object.assign({}, kernelConfig, {
	      backendName: newBackendName
	    });
	    registerKernel(newKernelConfig);
	  });
	}