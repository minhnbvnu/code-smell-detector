function getViewportDimensions() {
	  return {
	    width: window.innerWidth || getViewportWidth(),
	    height: window.innerHeight || getViewportHeight()
	  };
	}