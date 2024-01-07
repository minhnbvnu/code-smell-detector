function getWebGLContext(webGLVersion) {
	  if (!(webGLVersion in contexts)) {
	    var newCtx = getWebGLRenderingContext(webGLVersion);

	    if (newCtx !== null) {
	      contexts[webGLVersion] = newCtx;
	    } else {
	      console.log('Could not get context for WebGL version', webGLVersion);
	      return null;
	    }
	  }

	  var gl = contexts[webGLVersion];

	  if (gl.isContextLost()) {
	    delete contexts[webGLVersion];
	    return getWebGLContext(webGLVersion);
	  }

	  gl.disable(gl.DEPTH_TEST);
	  gl.disable(gl.STENCIL_TEST);
	  gl.disable(gl.BLEND);
	  gl.disable(gl.DITHER);
	  gl.disable(gl.POLYGON_OFFSET_FILL);
	  gl.disable(gl.SAMPLE_COVERAGE);
	  gl.enable(gl.SCISSOR_TEST);
	  gl.enable(gl.CULL_FACE);
	  gl.cullFace(gl.BACK);
	  return contexts[webGLVersion];
	}