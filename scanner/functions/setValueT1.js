function setValueT1( gl, v, textures ) {

    	const cache = this.cache;
    	const unit = textures.allocateTextureUnit();

    	if ( cache[ 0 ] !== unit ) {

    		gl.uniform1i( this.addr, unit );
    		cache[ 0 ] = unit;

    	}

    	textures.safeSetTexture2D( v || emptyTexture, unit );

    }