function mapActivationToShaderProgram(activation, packed) {
	  if (packed === void 0) {
	    packed = false;
	  }

	  if (activation === 'linear') {
	    if (packed) {
	      return LINEAR$1;
	    }

	    return LINEAR;
	  } else if (activation === 'relu') {
	    if (packed) {
	      return RELU$1;
	    }

	    return RELU;
	  } else if (activation === 'elu') {
	    if (packed) {
	      return ELU$2;
	    }

	    return ELU$1;
	  } else if (activation === 'relu6') {
	    if (packed) {
	      return RELU6$1;
	    }

	    return RELU6;
	  } else if (activation === 'prelu') {
	    if (packed) {
	      return PRELU_PACKED;
	    }

	    return PRELU;
	  } else if (activation === 'leakyrelu') {
	    if (packed) {
	      return LEAKYRELU_PACKED;
	    }

	    return LEAKYRELU;
	  }

	  throw new Error("Activation " + activation + " has not been implemented for the WebGL backend.");
	}