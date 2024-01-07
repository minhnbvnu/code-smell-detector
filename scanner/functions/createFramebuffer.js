function createFramebuffer(gl) {
	  return throwIfNull(gl, function () {
	    return gl.createFramebuffer();
	  }, 'Unable to create WebGLFramebuffer.');
	}