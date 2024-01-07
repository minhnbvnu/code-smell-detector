function internalFormatForPhysicalTexType(physicalTexType, textureConfig) {
	  switch (physicalTexType) {
	    case PhysicalTextureType.PACKED_2X2_FLOAT32:
	      return getInternalFormatForPackedMatrixTexture(textureConfig);

	    case PhysicalTextureType.PACKED_2X2_FLOAT16:
	      return getInternalFormatForFloat16PackedMatrixTexture(textureConfig);

	    case PhysicalTextureType.UNPACKED_FLOAT32:
	      return getInternalFormatForFloat32MatrixTexture(textureConfig);

	    case PhysicalTextureType.UNPACKED_FLOAT16:
	      return getInternalFormatForFloat16MatrixTexture(textureConfig);

	    case PhysicalTextureType.PACKED_4X1_UNSIGNED_BYTE:
	      return getInternalFormatForUnsignedBytesMatrixTexture(textureConfig);

	    default:
	      throw new Error("Unknown physical texture type " + physicalTexType);
	  }
	}