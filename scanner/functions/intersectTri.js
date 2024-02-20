function intersectTri( geo, side, ray, tri, intersections ) {

    	const triOffset = tri * 3;
    	const a = geo.index.getX( triOffset );
    	const b = geo.index.getX( triOffset + 1 );
    	const c = geo.index.getX( triOffset + 2 );

    	const intersection = checkBufferGeometryIntersection( ray, geo.attributes.position, geo.attributes.uv, a, b, c, side );

    	if ( intersection ) {

    		intersection.faceIndex = tri;
    		if ( intersections ) intersections.push( intersection );
    		return intersection;

    	}

    	return null;

    }