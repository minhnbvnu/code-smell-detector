function expandByTriangleBounds( startIndex, triangleBounds, bounds ) {

    	for ( let d = 0; d < 3; d ++ ) {

    		const tCenter = triangleBounds[ startIndex + 2 * d ];
    		const tHalf = triangleBounds[ startIndex + 2 * d + 1 ];

    		const tMin = tCenter - tHalf;
    		const tMax = tCenter + tHalf;

    		if ( tMin < bounds[ d ] ) {

    			bounds[ d ] = tMin;

    		}

    		if ( tMax > bounds[ d + 3 ] ) {

    			bounds[ d + 3 ] = tMax;

    		}

    	}

    }