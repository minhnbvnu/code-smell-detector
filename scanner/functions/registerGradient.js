function registerGradient(config) {
	  var kernelName = config.kernelName;

	  if (gradRegistry.has(kernelName)) {
	    // TODO (yassogba) after 3.0 assess whether we need to keep this gated
	    // to debug mode.
	    if (env().getBool('DEBUG')) {
	      console.warn("Overriding the gradient for '" + kernelName + "'");
	    }
	  }

	  gradRegistry.set(kernelName, config);
	}