function computeBytes(shape, physicalTexType, gl, textureConfig, isPacked) {
	  // It is not possible to infer packed status from the texture type because
	  // depending on the textureConfig, different  texture types may resolve to the
	  // same internal format (e.g. in WebGL1, the internal format for
	  // UNPACKED_FLOAT16 textures is gl.RGBA). Therefore we pass in `isPacked`
	  // explicitly.
	  var internalFormat = internalFormatForPhysicalTexType(physicalTexType, textureConfig);
	  var numElements;

	  if (isPacked) {
	    var _getPackedMatrixTextu = getPackedMatrixTextureShapeWidthHeight(shape[0], shape[1]),
	        packedWidth = _getPackedMatrixTextu[0],
	        packedHeight = _getPackedMatrixTextu[1];

	    numElements = packedWidth * packedHeight;
	  } else {
	    var _getUnpackedMatrixTex = getUnpackedMatrixTextureShapeWidthHeight(shape[0], shape[1]),
	        width = _getUnpackedMatrixTex[0],
	        height = _getUnpackedMatrixTex[1];

	    numElements = width * height;
	  }

	  var bytesPerElement = numBytesForInternalFormat(gl, internalFormat);
	  return numElements * bytesPerElement;
	}