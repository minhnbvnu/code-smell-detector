function getElementPosition(element) {
	  var rect = element.getBoundingClientRect();

	  return {
	    top: rect.top + window.pageYOffset,
	    left: rect.left + window.pageXOffset
	  };
	}