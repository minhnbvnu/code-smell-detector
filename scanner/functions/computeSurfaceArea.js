function computeSurfaceArea( bounds ) {

    	const d0 = bounds[ 3 ] - bounds[ 0 ];
    	const d1 = bounds[ 4 ] - bounds[ 1 ];
    	const d2 = bounds[ 5 ] - bounds[ 2 ];

    	return 2 * ( d0 * d1 + d1 * d2 + d2 * d0 );

    }