function getMaxTexturesInShader(webGLVersion) {
	  if (MAX_TEXTURES_IN_SHADER == null) {
	    var gl = getWebGLContext(webGLVersion);
	    MAX_TEXTURES_IN_SHADER = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
	  } // We cap at 16 to avoid spurious runtime "memory exhausted" error.


	  return Math.min(16, MAX_TEXTURES_IN_SHADER);
	}