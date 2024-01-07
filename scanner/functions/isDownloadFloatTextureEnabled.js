function isDownloadFloatTextureEnabled(webGLVersion) {
	  if (webGLVersion === 0) {
	    return false;
	  }

	  var gl = getWebGLContext(webGLVersion);

	  if (webGLVersion === 1) {
	    if (!hasExtension(gl, 'OES_texture_float')) {
	      return false;
	    }

	    if (!hasExtension(gl, 'WEBGL_color_buffer_float')) {
	      return false;
	    }
	  } else {
	    if (hasExtension(gl, 'EXT_color_buffer_float')) {
	      return createFloatTextureAndBindToFramebuffer(gl);
	    }

	    var COLOR_BUFFER_HALF_FLOAT = 'EXT_color_buffer_half_float';

	    if (hasExtension(gl, COLOR_BUFFER_HALF_FLOAT)) {
	      var textureHalfFloatExtension = gl.getExtension(COLOR_BUFFER_HALF_FLOAT);
	      return createHalfFloatTextureAndBindToFramebuffer(gl, textureHalfFloatExtension);
	    }

	    return false;
	  }

	  var isFrameBufferComplete = createFloatTextureAndBindToFramebuffer(gl);
	  return isFrameBufferComplete;
	}