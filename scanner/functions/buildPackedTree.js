function buildPackedTree( geo, options ) {

    	// boundingData  				: 6 float32
    	// right / offset 				: 1 uint32
    	// splitAxis / isLeaf + count 	: 1 uint32 / 2 uint16
    	const roots = buildTree( geo, options );

    	let float32Array;
    	let uint32Array;
    	let uint16Array;
    	const packedRoots = [];
    	const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    	for ( let i = 0; i < roots.length; i ++ ) {

    		const root = roots[ i ];
    		let nodeCount = countNodes( root );

    		const buffer = new BufferConstructor( BYTES_PER_NODE * nodeCount );
    		float32Array = new Float32Array( buffer );
    		uint32Array = new Uint32Array( buffer );
    		uint16Array = new Uint16Array( buffer );
    		populateBuffer( 0, root );
    		packedRoots.push( buffer );

    	}

    	return packedRoots;

    	function countNodes( node ) {

    		if ( node.count ) {

    			return 1;

    		} else {

    			return 1 + countNodes( node.left ) + countNodes( node.right );

    		}

    	}

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

    }