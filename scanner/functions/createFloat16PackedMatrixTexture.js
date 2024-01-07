function createFloat16PackedMatrixTexture(gl, rows, columns, textureConfig) {
	  var _tex_util$getPackedMa2 = getPackedMatrixTextureShapeWidthHeight(rows, columns),
	      width = _tex_util$getPackedMa2[0],
	      height = _tex_util$getPackedMa2[1];

	  return createAndConfigureTexture(gl, width, height, getInternalFormatForFloat16PackedMatrixTexture(textureConfig), gl.RGBA, textureConfig.textureTypeHalfFloat);
	}