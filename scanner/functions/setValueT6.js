function setValueT6( gl, v, textures ) {

    	const cache = this.cache;
    	const unit = textures.allocateTextureUnit();

    	if ( cache[ 0 ] !== unit ) {

    		gl.uniform1i( this.addr, unit );
    		cache[ 0 ] = unit;

    	}

    	textures.safeSetTextureCube( v || emptyCubeTexture, unit );

    }