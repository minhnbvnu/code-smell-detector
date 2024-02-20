function setValueT6Array( gl, v, textures ) {

    	const n = v.length;

    	const units = allocTexUnits( textures, n );

    	gl.uniform1iv( this.addr, units );

    	for ( let i = 0; i !== n; ++ i ) {

    		textures.safeSetTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

    	}

    }