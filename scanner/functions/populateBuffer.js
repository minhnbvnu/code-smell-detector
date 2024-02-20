function populateBuffer( byteOffset, node ) {

    		const stride4Offset = byteOffset / 4;
    		const stride2Offset = byteOffset / 2;
    		const isLeaf = ! ! node.count;
    		const boundingData = node.boundingData;
    		for ( let i = 0; i < 6; i ++ ) {

    			float32Array[ stride4Offset + i ] = boundingData[ i ];

    		}

    		if ( isLeaf ) {

    			const offset = node.offset;
    			const count = node.count;
    			uint32Array[ stride4Offset + 6 ] = offset;
    			uint16Array[ stride2Offset + 14 ] = count;
    			uint16Array[ stride2Offset + 15 ] = IS_LEAFNODE_FLAG;
    			return byteOffset + BYTES_PER_NODE;

    		} else {

    			const left = node.left;
    			const right = node.right;
    			const splitAxis = node.splitAxis;

    			let nextUnusedPointer;
    			nextUnusedPointer = populateBuffer( byteOffset + BYTES_PER_NODE, left );

    			if ( ( nextUnusedPointer / 4 ) > Math.pow( 2, 32 ) ) {

    				throw new Error( 'MeshBVH: Cannot store child pointer greater than 32 bits.' );

    			}

    			uint32Array[ stride4Offset + 6 ] = nextUnusedPointer / 4;
    			nextUnusedPointer = populateBuffer( nextUnusedPointer, right );

    			uint32Array[ stride4Offset + 7 ] = splitAxis;
    			return nextUnusedPointer;

    		}

    	}