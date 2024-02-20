function setTextureCube( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			uploadCubeTexture( textureProperties, texture, slot );
    			return;

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 34067, textureProperties.__webglTexture );

    	}