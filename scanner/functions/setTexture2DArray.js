function setTexture2DArray( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			uploadTexture( textureProperties, texture, slot );
    			return;

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 35866, textureProperties.__webglTexture );

    	}