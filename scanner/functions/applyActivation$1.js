function applyActivation$1(backend, x, activation, preluActivationWeights, leakyreluAlpha) {
	  if (activation === 'linear') {
	    return identity$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  } else if (activation === 'relu') {
	    return relu$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  } else if (activation === 'elu') {
	    return elu$3({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  } else if (activation === 'relu6') {
	    return relu6$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  } else if (activation === 'prelu') {
	    return prelu$2({
	      inputs: {
	        x: x,
	        alpha: preluActivationWeights
	      },
	      backend: backend
	    });
	  } else if (activation === 'leakyrelu') {
	    return leakyRelu$1({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        alpha: leakyreluAlpha
	      }
	    });
	  }

	  throw new Error("Activation " + activation + " has not been implemented for the CPU backend.");
	}