function isUniqueEdge( start, end, edges ) {

    	const hash1 = `${start.x},${start.y},${start.z}-${end.x},${end.y},${end.z}`;
    	const hash2 = `${end.x},${end.y},${end.z}-${start.x},${start.y},${start.z}`; // coincident edge

    	if ( edges.has( hash1 ) === true || edges.has( hash2 ) === true ) {

    		return false;

    	} else {

    		edges.add( hash1, hash2 );
    		return true;

    	}

    }