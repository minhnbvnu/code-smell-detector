function mapActivationToFusedKernel(activationName) {
	  if (activationName === 'relu') {
	    return 'relu';
	  }

	  if (activationName === 'linear') {
	    return 'linear';
	  }

	  if (activationName === 'elu') {
	    return 'elu';
	  }

	  return null;
	}