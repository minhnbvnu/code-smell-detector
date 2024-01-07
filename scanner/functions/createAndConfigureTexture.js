function createAndConfigureTexture(gl, width, height, internalFormat, textureFormat, textureType) {
	  validateTextureSize(width, height);
	  var texture = createTexture(gl);
	  var tex2d = gl.TEXTURE_2D;
	  callAndCheck(gl, function () {
	    return gl.bindTexture(tex2d, texture);
	  });
	  callAndCheck(gl, function () {
	    return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	  });
	  callAndCheck(gl, function () {
	    return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	  });
	  callAndCheck(gl, function () {
	    return gl.texParameteri(tex2d, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	  });
	  callAndCheck(gl, function () {
	    return gl.texParameteri(tex2d, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	  });
	  callAndCheck(gl, function () {
	    return gl.texImage2D(tex2d, 0, internalFormat, width, height, 0, textureFormat, textureType, null);
	  });
	  callAndCheck(gl, function () {
	    return gl.bindTexture(gl.TEXTURE_2D, null);
	  });
	  return texture;
	}