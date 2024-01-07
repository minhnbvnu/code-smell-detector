function isWebGLFenceEnabled(webGLVersion) {
	  if (webGLVersion !== 2) {
	    return false;
	  }

	  var gl = getWebGLContext(webGLVersion); // tslint:disable-next-line:no-any

	  var isEnabled = gl.fenceSync != null;
	  return isEnabled;
	}