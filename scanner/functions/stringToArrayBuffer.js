function stringToArrayBuffer( text ) {

    	if ( window.TextEncoder !== undefined ) {

    		return new TextEncoder().encode( text ).buffer;

    	}

    	const array = new Uint8Array( new ArrayBuffer( text.length ) );

    	for ( let i = 0, il = text.length; i < il; i ++ ) {

    		const value = text.charCodeAt( i );

    		// Replacing multi-byte character with space(0x20).
    		array[ i ] = value > 0xFF ? 0x20 : value;

    	}

    	return array.buffer;

    }