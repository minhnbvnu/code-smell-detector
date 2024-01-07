function validateFramebuffer(gl) {
	  var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

	  if (status !== gl.FRAMEBUFFER_COMPLETE) {
	    throw new Error('Error binding framebuffer: ' + getFramebufferErrorMessage(gl, status));
	  }
	}