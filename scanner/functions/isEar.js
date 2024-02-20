function isEar( ear ) {

    	const a = ear.prev,
    		b = ear,
    		c = ear.next;

    	if ( area( a, b, c ) >= 0 ) return false; // reflex, can't be an ear

    	// now make sure we don't have other points inside the potential ear
    	let p = ear.next.next;

    	while ( p !== ear.prev ) {

    		if ( pointInTriangle( a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y ) &&
    			area( p.prev, p, p.next ) >= 0 ) return false;
    		p = p.next;

    	}

    	return true;

    }