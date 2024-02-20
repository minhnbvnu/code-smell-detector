function textureNeedsPowerOfTwo( texture ) {

    		if ( isWebGL2 ) return false;

    		return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
    			( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );

    	}