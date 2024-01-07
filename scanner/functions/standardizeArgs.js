function standardizeArgs(inputs, initialState, constants, numConstants) {
	  if (Array.isArray(inputs)) {
	    if (initialState != null || constants != null) {
	      throw new ValueError('When inputs is an array, neither initialState or constants ' + 'should be provided');
	    }

	    if (numConstants != null) {
	      constants = inputs.slice(inputs.length - numConstants, inputs.length);
	      inputs = inputs.slice(0, inputs.length - numConstants);
	    }

	    if (inputs.length > 1) {
	      initialState = inputs.slice(1, inputs.length);
	    }

	    inputs = inputs[0];
	  }

	  function toListOrNull(x) {
	    if (x == null || Array.isArray(x)) {
	      return x;
	    } else {
	      return [x];
	    }
	  }

	  initialState = toListOrNull(initialState);
	  constants = toListOrNull(constants);
	  return {
	    inputs: inputs,
	    initialState: initialState,
	    constants: constants
	  };
	}