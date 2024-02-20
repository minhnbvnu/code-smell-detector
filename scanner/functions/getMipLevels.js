function getMipLevels( texture, image, supportsMips ) {

    		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) === true ) {

    			// generated mipmaps via gl.generateMipmap()

    			return Math.log2( Math.max( image.width, image.height ) ) + 1;

    		} else if ( texture.mipmaps.length > 0 ) {

    			// user-defined mipmaps

    			return texture.mipmaps.length;

    		} else {

    			// texture without mipmaps (only base level)

    			return 1;

    		}

    	}