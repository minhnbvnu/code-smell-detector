function getPhysicalFromLogicalTextureType(logicalTexType, isPacked) {
	  if (logicalTexType === TextureUsage.UPLOAD) {
	    return PhysicalTextureType.PACKED_2X2_FLOAT32;
	  } else if (logicalTexType === TextureUsage.RENDER || logicalTexType == null) {
	    return getPhysicalTextureForRendering(isPacked);
	  } else if (logicalTexType === TextureUsage.DOWNLOAD || logicalTexType === TextureUsage.PIXELS) {
	    return PhysicalTextureType.PACKED_4X1_UNSIGNED_BYTE;
	  }

	  throw new Error("Unknown logical texture type " + logicalTexType);
	}