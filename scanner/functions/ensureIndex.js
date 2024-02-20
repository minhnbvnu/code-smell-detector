function ensureIndex( geo, options ) {

    	if ( ! geo.index ) {

    		const vertexCount = geo.attributes.position.count;
    		const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    		let index;
    		if ( vertexCount > 65535 ) {

    			index = new Uint32Array( new BufferConstructor( 4 * vertexCount ) );

    		} else {

    			index = new Uint16Array( new BufferConstructor( 2 * vertexCount ) );

    		}

    		geo.setIndex( new BufferAttribute( index, 1 ) );

    		for ( let i = 0; i < vertexCount; i ++ ) {

    			index[ i ] = i;

    		}

    	}

    }