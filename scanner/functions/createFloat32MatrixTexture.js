function createFloat32MatrixTexture(gl, rows, columns, textureConfig) {
	  var _tex_util$getUnpacked = getUnpackedMatrixTextureShapeWidthHeight(rows, columns),
	      width = _tex_util$getUnpacked[0],
	      height = _tex_util$getUnpacked[1];

	  return createAndConfigureTexture(gl, width, height, getInternalFormatForFloat32MatrixTexture(textureConfig), textureConfig.textureFormatFloat, gl.FLOAT);
	}