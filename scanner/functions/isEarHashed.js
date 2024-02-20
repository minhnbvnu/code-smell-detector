function isEarHashed( ear, minX, minY, invSize ) {

    	const a = ear.prev,
    		b = ear,
    		c = ear.next;

    	if ( area( a, b, c ) >= 0 ) return false; // reflex, can't be an ear

    	// triangle bbox; min & max are calculated like this for speed
    	const minTX = a.x < b.x ? ( a.x < c.x ? a.x : c.x ) : ( b.x < c.x ? b.x : c.x ),
    		minTY = a.y < b.y ? ( a.y < c.y ? a.y : c.y ) : ( b.y < c.y ? b.y : c.y ),
    		maxTX = a.x > b.x ? ( a.x > c.x ? a.x : c.x ) : ( b.x > c.x ? b.x : c.x ),
    		maxTY = a.y > b.y ? ( a.y > c.y ? a.y : c.y ) : ( b.y > c.y ? b.y : c.y );

    	// z-order range for the current triangle bbox;
    	const minZ = zOrder( minTX, minTY, minX, minY, invSize ),
    		maxZ = zOrder( maxTX, maxTY, minX, minY, invSize );

    	let p = ear.prevZ,
    		n = ear.nextZ;

    	// look for points inside the triangle in both directions
    	while ( p && p.z >= minZ && n && n.z <= maxZ ) {

    		if ( p !== ear.prev && p !== ear.next &&
    			pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
    			area( p.prev, p, p.next ) >= 0 ) return false;
    		p = p.prevZ;

    		if ( n !== ear.prev && n !== ear.next &&
    			pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y ) &&
    			area( n.prev, n, n.next ) >= 0 ) return false;
    		n = n.nextZ;

    	}

    	// look for remaining points in decreasing z-order
    	while ( p && p.z >= minZ ) {

    		if ( p !== ear.prev && p !== ear.next &&
    			pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
    			area( p.prev, p, p.next ) >= 0 ) return false;
    		p = p.prevZ;

    	}

    	// look for remaining points in increasing z-order
    	while ( n && n.z <= maxZ ) {

    		if ( n !== ear.prev && n !== ear.next &&
    			pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y ) &&
    			area( n.prev, n, n.next ) >= 0 ) return false;
    		n = n.nextZ;

    	}

    	return true;

    }