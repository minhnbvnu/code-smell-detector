function getViewportWidth() {
	  var width = void 0;
	  if (document.documentElement) {
	    width = document.documentElement.clientWidth;
	  }

	  if (!width && document.body) {
	    width = document.body.clientWidth;
	  }

	  return width || 0;
	}