function isCapableOfRenderingToFloatTexture(webGLVersion) {
	  if (webGLVersion === 0) {
	    return false;
	  }

	  var gl = getWebGLContext(webGLVersion);

	  if (webGLVersion === 1) {
	    if (!hasExtension(gl, 'OES_texture_float')) {
	      return false;
	    }
	  } else {
	    if (!hasExtension(gl, 'EXT_color_buffer_float')) {
	      return false;
	    }
	  }

	  var isFrameBufferComplete = createFloatTextureAndBindToFramebuffer(gl);
	  return isFrameBufferComplete;
	}