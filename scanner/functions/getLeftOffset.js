function getLeftOffset( nodeIndex32 ) {

    			let nodeIndex16 = nodeIndex32 * 2, uint16Array = _uint16Array, uint32Array = _uint32Array;

    			// traverse until we find a leaf
    			while ( ! IS_LEAF( nodeIndex16, uint16Array ) ) {

    				nodeIndex32 = LEFT_NODE( nodeIndex32 );
    				nodeIndex16 = nodeIndex32 * 2;

    			}

    			return OFFSET( nodeIndex32, uint32Array );

    		}