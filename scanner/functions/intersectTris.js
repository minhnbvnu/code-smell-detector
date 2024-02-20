function intersectTris( geo, side, ray, offset, count, intersections ) {

    	for ( let i = offset, end = offset + count; i < end; i ++ ) {

    		intersectTri( geo, side, ray, i, intersections );

    	}

    }