function intersectClosestTri( geo, side, ray, offset, count ) {

    	let dist = Infinity;
    	let res = null;
    	for ( let i = offset, end = offset + count; i < end; i ++ ) {

    		const intersection = intersectTri( geo, side, ray, i );
    		if ( intersection && intersection.distance < dist ) {

    			res = intersection;
    			dist = intersection.distance;

    		}

    	}

    	return res;

    }