function computeTriangleBounds( geo, fullBounds ) {

    	const posAttr = geo.attributes.position;
    	const posArr = posAttr.array;
    	const index = geo.index.array;
    	const triCount = index.length / 3;
    	const triangleBounds = new Float32Array( triCount * 6 );

    	// support for an interleaved position buffer
    	const bufferOffset = posAttr.offset || 0;
    	let stride = 3;
    	if ( posAttr.isInterleavedBufferAttribute ) {

    		stride = posAttr.data.stride;

    	}

    	for ( let tri = 0; tri < triCount; tri ++ ) {

    		const tri3 = tri * 3;
    		const tri6 = tri * 6;
    		const ai = index[ tri3 + 0 ] * stride + bufferOffset;
    		const bi = index[ tri3 + 1 ] * stride + bufferOffset;
    		const ci = index[ tri3 + 2 ] * stride + bufferOffset;

    		for ( let el = 0; el < 3; el ++ ) {

    			const a = posArr[ ai + el ];
    			const b = posArr[ bi + el ];
    			const c = posArr[ ci + el ];

    			let min = a;
    			if ( b < min ) min = b;
    			if ( c < min ) min = c;

    			let max = a;
    			if ( b > max ) max = b;
    			if ( c > max ) max = c;

    			// Increase the bounds size by float32 epsilon to avoid precision errors when
    			// converting to 32 bit float. Scale the epsilon by the size of the numbers being
    			// worked with.
    			const halfExtents = ( max - min ) / 2;
    			const el2 = el * 2;
    			triangleBounds[ tri6 + el2 + 0 ] = min + halfExtents;
    			triangleBounds[ tri6 + el2 + 1 ] = halfExtents + ( Math.abs( min ) + halfExtents ) * FLOAT32_EPSILON;

    			if ( min < fullBounds[ el ] ) fullBounds[ el ] = min;
    			if ( max > fullBounds[ el + 3 ] ) fullBounds[ el + 3 ] = max;

    		}

    	}

    	return triangleBounds;

    }