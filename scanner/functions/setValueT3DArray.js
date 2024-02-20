function setValueT3DArray( gl, v, textures ) {

    	const n = v.length;

    	const units = allocTexUnits( textures, n );

    	gl.uniform1iv( this.addr, units );

    	for ( let i = 0; i !== n; ++ i ) {

    		textures.setTexture3D( v[ i ] || emptyTexture3d, units[ i ] );

    	}

    }