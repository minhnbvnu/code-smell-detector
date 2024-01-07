function getWebGLErrorMessage(gl, status) {
	  switch (status) {
	    case gl.NO_ERROR:
	      return 'NO_ERROR';

	    case gl.INVALID_ENUM:
	      return 'INVALID_ENUM';

	    case gl.INVALID_VALUE:
	      return 'INVALID_VALUE';

	    case gl.INVALID_OPERATION:
	      return 'INVALID_OPERATION';

	    case gl.INVALID_FRAMEBUFFER_OPERATION:
	      return 'INVALID_FRAMEBUFFER_OPERATION';

	    case gl.OUT_OF_MEMORY:
	      return 'OUT_OF_MEMORY';

	    case gl.CONTEXT_LOST_WEBGL:
	      return 'CONTEXT_LOST_WEBGL';

	    default:
	      return "Unknown error code " + status;
	  }
	}