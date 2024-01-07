function getFusedDyActivation(dy, y, activation) {
	  if (activation == null || activation === 'linear') {
	    return dy;
	  }

	  if (activation === 'relu') {
	    return mul(dy, step(y));
	  }

	  throw new Error("Cannot compute gradient for fused activation " + activation + ".");
	}