function getWebGLMaxTextureSize(webGLVersion) {
	  if (MAX_TEXTURE_SIZE == null) {
	    var gl = getWebGLContext(webGLVersion);
	    MAX_TEXTURE_SIZE = gl.getParameter(gl.MAX_TEXTURE_SIZE);
	  }

	  return MAX_TEXTURE_SIZE;
	}