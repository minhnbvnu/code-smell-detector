function downloadByteEncodedFloatMatrixFromOutputTexture(gl, rows, columns, textureConfig) {
	  var _tex_util$getUnpacked4 = getUnpackedMatrixTextureShapeWidthHeight(rows, columns),
	      w = _tex_util$getUnpacked4[0],
	      h = _tex_util$getUnpacked4[1];

	  var numChannels = 4;
	  var downloadTarget = new Uint8Array(getUnpackedArraySizeFromMatrixSize(rows * columns, numChannels));
	  callAndCheck(gl, function () {
	    return gl.readPixels(0, 0, w, h, textureConfig.downloadTextureFormat, gl.UNSIGNED_BYTE, downloadTarget);
	  }); // By wrapping the buffer in a Float32Array, we use native browser IEEE 754
	  // decoding of the 4 bytes that back each 32 bit float.

	  return new Float32Array(downloadTarget.buffer);
	}