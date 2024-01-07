function isWebGLVersionEnabled(webGLVersion) {
	  try {
	    var gl = getWebGLContext(webGLVersion);

	    if (gl != null) {
	      return true;
	    }
	  } catch (e) {
	    console.log('Error when getting WebGL context: ', e);
	    return false;
	  }

	  return false;
	}