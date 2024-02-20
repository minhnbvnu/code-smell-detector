function textureNeedsGenerateMipmaps( texture, supportsMips ) {

    		return texture.generateMipmaps && supportsMips &&
    			texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

    	}