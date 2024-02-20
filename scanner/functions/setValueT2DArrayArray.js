function setValueT2DArrayArray( gl, v, textures ) {

    	const n = v.length;

    	const units = allocTexUnits( textures, n );

    	gl.uniform1iv( this.addr, units );

    	for ( let i = 0; i !== n; ++ i ) {

    		textures.setTexture2DArray( v[ i ] || emptyTexture2dArray, units[ i ] );

    	}

    }