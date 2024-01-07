function unbindColorTextureFromFramebuffer(gl, framebuffer) {
	  callAndCheck(gl, function () {
	    return gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	  });
	  callAndCheck(gl, function () {
	    return gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0);
	  });
	}