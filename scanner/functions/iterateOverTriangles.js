function iterateOverTriangles(
    	offset,
    	count,
    	geometry,
    	intersectsTriangleFunc,
    	contained,
    	depth,
    	triangle
    ) {

    	const index = geometry.index;
    	const pos = geometry.attributes.position;
    	for ( let i = offset, l = count + offset; i < l; i ++ ) {

    		setTriangle( triangle, i * 3, index, pos );
    		triangle.needsUpdate = true;

    		if ( intersectsTriangleFunc( triangle, i, contained, depth ) ) {

    			return true;

    		}

    	}

    	return false;

    }