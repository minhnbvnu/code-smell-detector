function bindTextureToProgramUniformSampler(gl, texture, uniformSamplerLocation, textureUnit) {
	  callAndCheck(gl, function () {
	    return bindTextureUnit(gl, texture, textureUnit);
	  });
	  callAndCheck(gl, function () {
	    return gl.uniform1i(uniformSamplerLocation, textureUnit);
	  });
	}