function getMinMax( attribute, start, count ) {

    	const output = {

    		min: new Array( attribute.itemSize ).fill( Number.POSITIVE_INFINITY ),
    		max: new Array( attribute.itemSize ).fill( Number.NEGATIVE_INFINITY )

    	};

    	for ( let i = start; i < start + count; i ++ ) {

    		for ( let a = 0; a < attribute.itemSize; a ++ ) {

    			let value;

    			if ( attribute.itemSize > 4 ) {

    				 // no support for interleaved data for itemSize > 4

    				value = attribute.array[ i * attribute.itemSize + a ];

    			} else {

    				if ( a === 0 ) value = attribute.getX( i );
    				else if ( a === 1 ) value = attribute.getY( i );
    				else if ( a === 2 ) value = attribute.getZ( i );
    				else if ( a === 3 ) value = attribute.getW( i );

    			}

    			output.min[ a ] = Math.min( output.min[ a ], value );
    			output.max[ a ] = Math.max( output.max[ a ], value );

    		}

    	}

    	return output;

    }