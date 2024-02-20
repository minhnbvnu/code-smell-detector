function getPaddedArrayBuffer( arrayBuffer, paddingByte = 0 ) {

    	const paddedLength = getPaddedBufferSize( arrayBuffer.byteLength );

    	if ( paddedLength !== arrayBuffer.byteLength ) {

    		const array = new Uint8Array( paddedLength );
    		array.set( new Uint8Array( arrayBuffer ) );

    		if ( paddingByte !== 0 ) {

    			for ( let i = arrayBuffer.byteLength; i < paddedLength; i ++ ) {

    				array[ i ] = paddingByte;

    			}

    		}

    		return array.buffer;

    	}

    	return arrayBuffer;

    }