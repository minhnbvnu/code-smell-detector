function createFloat16MatrixTexture(gl, rows, columns, textureConfig) {
	  var _tex_util$getUnpacked2 = getUnpackedMatrixTextureShapeWidthHeight(rows, columns),
	      width = _tex_util$getUnpacked2[0],
	      height = _tex_util$getUnpacked2[1];

	  return createAndConfigureTexture(gl, width, height, getInternalFormatForFloat16MatrixTexture(textureConfig), textureConfig.textureFormatFloat, textureConfig.textureTypeHalfFloat);
	}