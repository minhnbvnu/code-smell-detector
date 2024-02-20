function uploadTexture2(name, width, height, data) {
			var texture = createOrReuseTexture(name);
			gl.activeTexture(gl.TEXTURE0);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0, // mip level
        gl.RGBA, // internal format
        width,
        height,
        0, // border
        gl.RGBA, // format
        gl.UNSIGNED_BYTE, //type
        data // data!
      );
		}