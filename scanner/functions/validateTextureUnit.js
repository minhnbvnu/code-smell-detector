function validateTextureUnit(gl, textureUnit) {
	  var maxTextureUnit = gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1;
	  var glTextureUnit = textureUnit + gl.TEXTURE0;

	  if (glTextureUnit < gl.TEXTURE0 || glTextureUnit > maxTextureUnit) {
	    var textureUnitRange = "[gl.TEXTURE0, gl.TEXTURE" + maxTextureUnit + "]";
	    throw new Error("textureUnit must be in " + textureUnitRange + ".");
	  }
	}