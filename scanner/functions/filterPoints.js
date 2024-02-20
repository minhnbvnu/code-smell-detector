function filterPoints( start, end ) {

    	if ( ! start ) return start;
    	if ( ! end ) end = start;

    	let p = start,
    		again;
    	do {

    		again = false;

    		if ( ! p.steiner && ( equals( p, p.next ) || area( p.prev, p, p.next ) === 0 ) ) {

    			removeNode( p );
    			p = end = p.prev;
    			if ( p === p.next ) break;
    			again = true;

    		} else {

    			p = p.next;

    		}

    	} while ( again || p !== end );

    	return end;

    }