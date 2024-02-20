function allocTexUnits( textures, n ) {

    	let r = arrayCacheI32[ n ];

    	if ( r === undefined ) {

    		r = new Int32Array( n );
    		arrayCacheI32[ n ] = r;

    	}

    	for ( let i = 0; i !== n; ++ i ) {

    		r[ i ] = textures.allocateTextureUnit();

    	}

    	return r;

    }