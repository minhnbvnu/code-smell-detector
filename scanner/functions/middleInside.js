function middleInside( a, b ) {

    	let p = a,
    		inside = false;
    	const px = ( a.x + b.x ) / 2,
    		py = ( a.y + b.y ) / 2;
    	do {

    		if ( ( ( p.y > py ) !== ( p.next.y > py ) ) && p.next.y !== p.y &&
    				( px < ( p.next.x - p.x ) * ( py - p.y ) / ( p.next.y - p.y ) + p.x ) )
    			inside = ! inside;
    		p = p.next;

    	} while ( p !== a );

    	return inside;

    }