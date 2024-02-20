function getRightEndOffset( nodeIndex32 ) {

    			let nodeIndex16 = nodeIndex32 * 2, uint16Array = _uint16Array, uint32Array = _uint32Array;

    			// traverse until we find a leaf
    			while ( ! IS_LEAF( nodeIndex16, uint16Array ) ) {

    				// adjust offset to point to the right node
    				nodeIndex32 = RIGHT_NODE( nodeIndex32, uint32Array );
    				nodeIndex16 = nodeIndex32 * 2;

    			}

    			// return the end offset of the triangle range
    			return OFFSET( nodeIndex32, uint32Array ) + COUNT( nodeIndex16, uint16Array );

    		}