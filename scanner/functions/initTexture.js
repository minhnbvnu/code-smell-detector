function initTexture( textureProperties, texture ) {

    		if ( textureProperties.__webglInit === undefined ) {

    			textureProperties.__webglInit = true;

    			texture.addEventListener( 'dispose', onTextureDispose );

    			textureProperties.__webglTexture = _gl.createTexture();

    			info.memory.textures ++;

    		}

    	}