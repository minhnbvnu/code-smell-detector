function findHoleBridge( hole, outerNode ) {

    	let p = outerNode;
    	const hx = hole.x;
    	const hy = hole.y;
    	let qx = - Infinity, m;

    	// find a segment intersected by a ray from the hole's leftmost point to the left;
    	// segment's endpoint with lesser x will be potential connection point
    	do {

    		if ( hy <= p.y && hy >= p.next.y && p.next.y !== p.y ) {

    			const x = p.x + ( hy - p.y ) * ( p.next.x - p.x ) / ( p.next.y - p.y );
    			if ( x <= hx && x > qx ) {

    				qx = x;
    				if ( x === hx ) {

    					if ( hy === p.y ) return p;
    					if ( hy === p.next.y ) return p.next;

    				}

    				m = p.x < p.next.x ? p : p.next;

    			}

    		}

    		p = p.next;

    	} while ( p !== outerNode );

    	if ( ! m ) return null;

    	if ( hx === qx ) return m; // hole touches outer segment; pick leftmost endpoint

    	// look for points inside the triangle of hole point, segment intersection and endpoint;
    	// if there are no points found, we have a valid connection;
    	// otherwise choose the point of the minimum angle with the ray as connection point

    	const stop = m,
    		mx = m.x,
    		my = m.y;
    	let tanMin = Infinity, tan;

    	p = m;

    	do {

    		if ( hx >= p.x && p.x >= mx && hx !== p.x &&
    				pointInTriangle( hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y ) ) {

    			tan = Math.abs( hy - p.y ) / ( hx - p.x ); // tangential

    			if ( locallyInside( p, hole ) && ( tan < tanMin || ( tan === tanMin && ( p.x > m.x || ( p.x === m.x && sectorContainsSector( m, p ) ) ) ) ) ) {

    				m = p;
    				tanMin = tan;

    			}

    		}

    		p = p.next;

    	} while ( p !== stop );

    	return m;

    }