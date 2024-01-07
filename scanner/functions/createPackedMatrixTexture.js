function createPackedMatrixTexture(gl, rows, columns, textureConfig) {
	  var _tex_util$getPackedMa = getPackedMatrixTextureShapeWidthHeight(rows, columns),
	      width = _tex_util$getPackedMa[0],
	      height = _tex_util$getPackedMa[1];

	  return createAndConfigureTexture(gl, width, height, getInternalFormatForPackedMatrixTexture(textureConfig), gl.RGBA, gl.FLOAT);
	}