function createUnsignedBytesMatrixTexture(gl, rows, columns, textureConfig) {
	  var _tex_util$getUnpacked3 = getUnpackedMatrixTextureShapeWidthHeight(rows, columns),
	      width = _tex_util$getUnpacked3[0],
	      height = _tex_util$getUnpacked3[1];

	  return createAndConfigureTexture(gl, width, height, getInternalFormatForUnsignedBytesMatrixTexture(textureConfig), gl.RGBA, gl.UNSIGNED_BYTE);
	}