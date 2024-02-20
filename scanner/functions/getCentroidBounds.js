function getCentroidBounds( triangleBounds, offset, count, centroidTarget ) {

    	let cminx = Infinity;
    	let cminy = Infinity;
    	let cminz = Infinity;
    	let cmaxx = - Infinity;
    	let cmaxy = - Infinity;
    	let cmaxz = - Infinity;

    	for ( let i = offset * 6, end = ( offset + count ) * 6; i < end; i += 6 ) {

    		const cx = triangleBounds[ i + 0 ];
    		if ( cx < cminx ) cminx = cx;
    		if ( cx > cmaxx ) cmaxx = cx;

    		const cy = triangleBounds[ i + 2 ];
    		if ( cy < cminy ) cminy = cy;
    		if ( cy > cmaxy ) cmaxy = cy;

    		const cz = triangleBounds[ i + 4 ];
    		if ( cz < cminz ) cminz = cz;
    		if ( cz > cmaxz ) cmaxz = cz;

    	}

    	centroidTarget[ 0 ] = cminx;
    	centroidTarget[ 1 ] = cminy;
    	centroidTarget[ 2 ] = cminz;

    	centroidTarget[ 3 ] = cmaxx;
    	centroidTarget[ 4 ] = cmaxy;
    	centroidTarget[ 5 ] = cmaxz;

    }