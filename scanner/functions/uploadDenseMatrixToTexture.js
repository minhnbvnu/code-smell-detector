function uploadDenseMatrixToTexture(gl, texture, width, height, data, textureConfig) {
	  callAndCheck(gl, function () {
	    return gl.bindTexture(gl.TEXTURE_2D, texture);
	  });
	  var dataForUpload, texelDataType, internalFormat;

	  if (data instanceof Uint8Array) {
	    dataForUpload = new Uint8Array(width * height * 4);
	    texelDataType = gl.UNSIGNED_BYTE;
	    internalFormat = gl.RGBA;
	  } else {
	    dataForUpload = new Float32Array(width * height * 4);
	    texelDataType = gl.FLOAT;
	    internalFormat = textureConfig.internalFormatPackedFloat;
	  }

	  dataForUpload.set(data);
	  callAndCheck(gl, function () {
	    return gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, gl.RGBA, texelDataType, dataForUpload);
	  });
	  callAndCheck(gl, function () {
	    return gl.bindTexture(gl.TEXTURE_2D, null);
	  });
	}