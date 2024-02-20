function safeSetTexture2D( texture, slot ) {

    		if ( texture && texture.isWebGLRenderTarget ) {

    			if ( warnedTexture2D === false ) {

    				console.warn( 'THREE.WebGLTextures.safeSetTexture2D: don\'t use render targets as textures. Use their .texture property instead.' );
    				warnedTexture2D = true;

    			}

    			texture = texture.texture;

    		}

    		setTexture2D( texture, slot );

    	}