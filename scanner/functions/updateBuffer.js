function updateBuffer( buffer, attribute, bufferType ) {

    		const array = attribute.array;
    		const updateRange = attribute.updateRange;

    		gl.bindBuffer( bufferType, buffer );

    		if ( updateRange.count === - 1 ) {

    			// Not using update ranges

    			gl.bufferSubData( bufferType, 0, array );

    		} else {

    			if ( isWebGL2 ) {

    				gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
    					array, updateRange.offset, updateRange.count );

    			} else {

    				gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
    					array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

    			}

    			updateRange.count = - 1; // reset range

    		}

    	}