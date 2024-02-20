function getValueFromEvent(e) {
	  // support custom element
	  if (!e || !e.target) {
	    return e;
	  }
	  var target = e.target;

	  return target.type === 'checkbox' ? target.checked : target.value;
	}