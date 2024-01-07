function createHalfFloatTextureAndBindToFramebuffer( // tslint:disable-next-line:no-any
	gl, textureHalfFloatExtension) {
	  var texConfig = getTextureConfig(gl, textureHalfFloatExtension);
	  var texture = gl.createTexture();
	  gl.bindTexture(gl.TEXTURE_2D, texture);
	  var width = 1;
	  var height = 1;
	  gl.texImage2D(gl.TEXTURE_2D, 0, texConfig.internalFormatHalfFloat, width, height, 0, texConfig.textureFormatFloat, texConfig.textureTypeHalfFloat, null);
	  var frameBuffer = gl.createFramebuffer();
	  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	  var isFrameBufferComplete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
	  gl.bindTexture(gl.TEXTURE_2D, null);
	  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	  gl.deleteTexture(texture);
	  gl.deleteFramebuffer(frameBuffer);
	  return isFrameBufferComplete;
	}