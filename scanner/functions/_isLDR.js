function _isLDR( texture ) {

    	if ( texture === undefined || texture.type !== UnsignedByteType ) return false;

    	return texture.encoding === LinearEncoding || texture.encoding === sRGBEncoding || texture.encoding === GammaEncoding;

    }