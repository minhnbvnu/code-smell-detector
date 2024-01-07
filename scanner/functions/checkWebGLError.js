function checkWebGLError(gl) {
	  var error = gl.getError();

	  if (error !== gl.NO_ERROR) {
	    throw new Error('WebGL Error: ' + getWebGLErrorMessage(gl, error));
	  }
	}