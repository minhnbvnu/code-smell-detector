function isValidDiagonal( a, b ) {

    	return a.next.i !== b.i && a.prev.i !== b.i && ! intersectsPolygon( a, b ) && // dones't intersect other edges
    		( locallyInside( a, b ) && locallyInside( b, a ) && middleInside( a, b ) && // locally visible
    		( area( a.prev, a, b.prev ) || area( a, b.prev, b ) ) || // does not create opposite-facing sectors
    		equals( a, b ) && area( a.prev, a, a.next ) > 0 && area( b.prev, b, b.next ) > 0 ); // special zero-length case

    }