function bindCanvasToFramebuffer(gl) {
	  callAndCheck(gl, function () {
	    return gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	  });
	  callAndCheck(gl, function () {
	    return gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	  });
	  callAndCheck(gl, function () {
	    return gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
	  });
	}