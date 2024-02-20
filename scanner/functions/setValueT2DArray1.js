function setValueT2DArray1( gl, v, textures ) {

    	const cache = this.cache;
    	const unit = textures.allocateTextureUnit();

    	if ( cache[ 0 ] !== unit ) {

    		gl.uniform1i( this.addr, unit );
    		cache[ 0 ] = unit;

    	}

    	textures.setTexture2DArray( v || emptyTexture2dArray, unit );

    }