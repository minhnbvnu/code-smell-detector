function setTexture2D( texture, slot ) {

    		const textureProperties = properties.get( texture );

    		if ( texture.isVideoTexture ) updateVideoTexture( texture );

    		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

    			const image = texture.image;

    			if ( image === undefined ) {

    				console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is undefined' );

    			} else if ( image.complete === false ) {

    				console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is incomplete' );

    			} else {

    				uploadTexture( textureProperties, texture, slot );
    				return;

    			}

    		}

    		state.activeTexture( 33984 + slot );
    		state.bindTexture( 3553, textureProperties.__webglTexture );

    	}