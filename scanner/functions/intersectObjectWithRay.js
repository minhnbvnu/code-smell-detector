function intersectObjectWithRay( object, raycaster, includeInvisible ) {

    	const allIntersections = raycaster.intersectObject( object, true );

    	for ( let i = 0; i < allIntersections.length; i ++ ) {

    		if ( allIntersections[ i ].object.visible || includeInvisible ) {

    			return allIntersections[ i ];

    		}

    	}

    	return false;

    }