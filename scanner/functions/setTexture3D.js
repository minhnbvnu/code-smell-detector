function setTexture3D( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			uploadTexture( textureProperties, texture, slot );
    			return;

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 32879, textureProperties.__webglTexture );

    	}