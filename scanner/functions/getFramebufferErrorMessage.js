function getFramebufferErrorMessage(gl, status) {
	  switch (status) {
	    case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
	      return 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT';

	    case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
	      return 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT';

	    case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
	      return 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS';

	    case gl.FRAMEBUFFER_UNSUPPORTED:
	      return 'FRAMEBUFFER_UNSUPPORTED';

	    default:
	      return "unknown error " + status;
	  }
	}