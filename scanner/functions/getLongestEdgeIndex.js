function getLongestEdgeIndex( bounds ) {

    	let splitDimIdx = - 1;
    	let splitDist = - Infinity;

    	for ( let i = 0; i < 3; i ++ ) {

    		const dist = bounds[ i + 3 ] - bounds[ i ];
    		if ( dist > splitDist ) {

    			splitDist = dist;
    			splitDimIdx = i;

    		}

    	}

    	return splitDimIdx;

    }