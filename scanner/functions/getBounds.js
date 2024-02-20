function getBounds( triangleBounds, offset, count, target, centroidTarget = null ) {

    	let minx = Infinity;
    	let miny = Infinity;
    	let minz = Infinity;
    	let maxx = - Infinity;
    	let maxy = - Infinity;
    	let maxz = - Infinity;

    	let cminx = Infinity;
    	let cminy = Infinity;
    	let cminz = Infinity;
    	let cmaxx = - Infinity;
    	let cmaxy = - Infinity;
    	let cmaxz = - Infinity;

    	const includeCentroid = centroidTarget !== null;
    	for ( let i = offset * 6, end = ( offset + count ) * 6; i < end; i += 6 ) {

    		const cx = triangleBounds[ i + 0 ];
    		const hx = triangleBounds[ i + 1 ];
    		const lx = cx - hx;
    		const rx = cx + hx;
    		if ( lx < minx ) minx = lx;
    		if ( rx > maxx ) maxx = rx;
    		if ( includeCentroid && cx < cminx ) cminx = cx;
    		if ( includeCentroid && cx > cmaxx ) cmaxx = cx;

    		const cy = triangleBounds[ i + 2 ];
    		const hy = triangleBounds[ i + 3 ];
    		const ly = cy - hy;
    		const ry = cy + hy;
    		if ( ly < miny ) miny = ly;
    		if ( ry > maxy ) maxy = ry;
    		if ( includeCentroid && cy < cminy ) cminy = cy;
    		if ( includeCentroid && cy > cmaxy ) cmaxy = cy;

    		const cz = triangleBounds[ i + 4 ];
    		const hz = triangleBounds[ i + 5 ];
    		const lz = cz - hz;
    		const rz = cz + hz;
    		if ( lz < minz ) minz = lz;
    		if ( rz > maxz ) maxz = rz;
    		if ( includeCentroid && cz < cminz ) cminz = cz;
    		if ( includeCentroid && cz > cmaxz ) cmaxz = cz;

    	}

    	target[ 0 ] = minx;
    	target[ 1 ] = miny;
    	target[ 2 ] = minz;

    	target[ 3 ] = maxx;
    	target[ 4 ] = maxy;
    	target[ 5 ] = maxz;

    	if ( includeCentroid ) {

    		centroidTarget[ 0 ] = cminx;
    		centroidTarget[ 1 ] = cminy;
    		centroidTarget[ 2 ] = cminz;

    		centroidTarget[ 3 ] = cmaxx;
    		centroidTarget[ 4 ] = cmaxy;
    		centroidTarget[ 5 ] = cmaxz;

    	}

    }