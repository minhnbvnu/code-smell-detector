function deallocateTexture( texture ) {

    		const textureProperties = properties.get( texture );

    		if ( textureProperties.__webglInit === undefined ) return;

    		_gl.deleteTexture( textureProperties.__webglTexture );

    		properties.remove( texture );

    	}