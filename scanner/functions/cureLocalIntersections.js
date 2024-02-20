function cureLocalIntersections( start, triangles, dim ) {

    	let p = start;
    	do {

    		const a = p.prev,
    			b = p.next.next;

    		if ( ! equals( a, b ) && intersects( a, p, p.next, b ) && locallyInside( a, b ) && locallyInside( b, a ) ) {

    			triangles.push( a.i / dim );
    			triangles.push( p.i / dim );
    			triangles.push( b.i / dim );

    			// remove two nodes involved
    			removeNode( p );
    			removeNode( p.next );

    			p = start = b;

    		}

    		p = p.next;

    	} while ( p !== start );

    	return filterPoints( p );

    }