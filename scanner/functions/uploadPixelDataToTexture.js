function uploadPixelDataToTexture(gl, texture, pixels) {
	  callAndCheck(gl, function () {
	    return gl.bindTexture(gl.TEXTURE_2D, texture);
	  });

	  if (pixels.data instanceof Uint8Array) {
	    callAndCheck(gl, function () {
	      return gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pixels.width, pixels.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels.data);
	    });
	  } else {
	    callAndCheck(gl, function () {
	      return gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
	    });
	  }

	  callAndCheck(gl, function () {
	    return gl.bindTexture(gl.TEXTURE_2D, null);
	  });
	}