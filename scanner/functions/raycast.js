function raycast( nodeIndex32, geometry, side, ray, intersects ) {

    	let nodeIndex16 = nodeIndex32 * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

    	const isLeaf = IS_LEAF( nodeIndex16, uint16Array );
    	if ( isLeaf ) {

    		const offset = OFFSET( nodeIndex32, uint32Array );
    		const count = COUNT( nodeIndex16, uint16Array );

    		intersectTris( geometry, side, ray, offset, count, intersects );

    	} else {

    		const leftIndex = LEFT_NODE( nodeIndex32 );
    		if ( intersectRay( leftIndex, float32Array, ray, boxIntersection ) ) {

    			raycast( leftIndex, geometry, side, ray, intersects );

    		}

    		const rightIndex = RIGHT_NODE( nodeIndex32, uint32Array );
    		if ( intersectRay( rightIndex, float32Array, ray, boxIntersection ) ) {

    			raycast( rightIndex, geometry, side, ray, intersects );

    		}

    	}

    }