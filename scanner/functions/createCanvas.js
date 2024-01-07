function createCanvas(webGLVersion) {
	  if (typeof OffscreenCanvas !== 'undefined' && webGLVersion === 2) {
	    return new OffscreenCanvas(300, 150);
	  } else if (typeof document !== 'undefined') {
	    return document.createElement('canvas');
	  } else {
	    throw new Error('Cannot create a canvas in this context');
	  }
	}