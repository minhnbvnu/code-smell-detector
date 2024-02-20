function intersectsPolygon( a, b ) {

    	let p = a;
    	do {

    		if ( p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
    				intersects( p, p.next, a, b ) ) return true;
    		p = p.next;

    	} while ( p !== a );

    	return false;

    }