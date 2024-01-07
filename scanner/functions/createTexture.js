function createTexture(gl) {
	  return throwIfNull(gl, function () {
	    return gl.createTexture();
	  }, 'Unable to create WebGLTexture.');
	}