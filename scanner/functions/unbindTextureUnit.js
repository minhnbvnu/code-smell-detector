function unbindTextureUnit(gl, textureUnit) {
	  validateTextureUnit(gl, textureUnit);
	  callAndCheck(gl, function () {
	    return gl.activeTexture(gl.TEXTURE0 + textureUnit);
	  });
	  callAndCheck(gl, function () {
	    return gl.bindTexture(gl.TEXTURE_2D, null);
	  });
	}