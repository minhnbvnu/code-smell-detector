function getPhysicalTextureForRendering(isPacked) {
	  if (env().getBool('WEBGL_RENDER_FLOAT32_ENABLED')) {
	    if (isPacked) {
	      return PhysicalTextureType.PACKED_2X2_FLOAT32;
	    }

	    return PhysicalTextureType.UNPACKED_FLOAT32;
	  }

	  if (isPacked) {
	    return PhysicalTextureType.PACKED_2X2_FLOAT16;
	  }

	  return PhysicalTextureType.UNPACKED_FLOAT16;
	}