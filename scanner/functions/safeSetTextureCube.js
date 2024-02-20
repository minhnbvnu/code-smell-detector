function safeSetTextureCube( texture, slot ) {

    		if ( texture && texture.isWebGLCubeRenderTarget ) {

    			if ( warnedTextureCube === false ) {

    				console.warn( 'THREE.WebGLTextures.safeSetTextureCube: don\'t use cube render targets as textures. Use their .texture property instead.' );
    				warnedTextureCube = true;

    			}

    			texture = texture.texture;

    		}


    		setTextureCube( texture, slot );

    	}