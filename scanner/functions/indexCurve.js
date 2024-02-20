function indexCurve( start, minX, minY, invSize ) {

    	let p = start;
    	do {

    		if ( p.z === null ) p.z = zOrder( p.x, p.y, minX, minY, invSize );
    		p.prevZ = p.prev;
    		p.nextZ = p.next;
    		p = p.next;

    	} while ( p !== start );

    	p.prevZ.nextZ = null;
    	p.prevZ = null;

    	sortLinked( p );

    }