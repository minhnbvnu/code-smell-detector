function intersects( p1, q1, p2, q2 ) {

    	const o1 = sign( area( p1, q1, p2 ) );
    	const o2 = sign( area( p1, q1, q2 ) );
    	const o3 = sign( area( p2, q2, p1 ) );
    	const o4 = sign( area( p2, q2, q1 ) );

    	if ( o1 !== o2 && o3 !== o4 ) return true; // general case

    	if ( o1 === 0 && onSegment( p1, p2, q1 ) ) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    	if ( o2 === 0 && onSegment( p1, q2, q1 ) ) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    	if ( o3 === 0 && onSegment( p2, p1, q2 ) ) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    	if ( o4 === 0 && onSegment( p2, q1, q2 ) ) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

    	return false;

    }