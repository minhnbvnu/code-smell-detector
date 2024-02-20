function setValueT1Array( gl, v, textures ) {

    	const n = v.length;

    	const units = allocTexUnits( textures, n );

    	gl.uniform1iv( this.addr, units );

    	for ( let i = 0; i !== n; ++ i ) {

    		textures.safeSetTexture2D( v[ i ] || emptyTexture, units[ i ] );

    	}

    }