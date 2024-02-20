function getHandleCenterPosition(vertical, handle) {
	  var coords = handle.getBoundingClientRect();
	  return vertical ? coords.top + coords.height * 0.5 : coords.left + coords.width * 0.5;
	}