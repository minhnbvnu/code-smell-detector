function makeSettledResult(state, position, value) {
	  if (state === FULFILLED) {
	    return {
	      state: 'fulfilled',
	      value: value
	    };
	  } else {
	    return {
	      state: 'rejected',
	      reason: value
	    };
	  }
	}