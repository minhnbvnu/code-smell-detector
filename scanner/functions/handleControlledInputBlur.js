function handleControlledInputBlur(inst, node) {
	  // TODO: In IE, inst is occasionally null. Why?
	  if (inst == null) {
	    return;
	  }
	
	  // Fiber and ReactDOM keep wrapper state in separate places
	  var state = inst._wrapperState || node._wrapperState;
	
	  if (!state || !state.controlled || node.type !== 'number') {
	    return;
	  }
	
	  // If controlled, assign the value attribute to the current value on blur
	  var value = '' + node.value;
	  if (node.getAttribute('value') !== value) {
	    node.setAttribute('value', value);
	  }
	}