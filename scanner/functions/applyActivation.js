function applyActivation(x, activation, preluActivationWeights, leakyreluAlpha) {
	  if (activation === 'linear') {
	    return x;
	  } else if (activation === 'relu') {
	    return relu(x);
	  } else if (activation === 'elu') {
	    return elu(x);
	  } else if (activation === 'relu6') {
	    return relu6(x);
	  } else if (activation === 'prelu') {
	    return prelu(x, preluActivationWeights);
	  } else if (activation === 'leakyrelu') {
	    return leakyRelu(x, leakyreluAlpha);
	  }

	  throw new Error("Unknown fused activation " + activation + ".");
	}