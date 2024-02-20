function splitEarcut( start, triangles, dim, minX, minY, invSize ) {

    	// look for a valid diagonal that divides the polygon into two
    	let a = start;
    	do {

    		let b = a.next.next;
    		while ( b !== a.prev ) {

    			if ( a.i !== b.i && isValidDiagonal( a, b ) ) {

    				// split the polygon in two by the diagonal
    				let c = splitPolygon( a, b );

    				// filter colinear points around the cuts
    				a = filterPoints( a, a.next );
    				c = filterPoints( c, c.next );

    				// run earcut on each half
    				earcutLinked( a, triangles, dim, minX, minY, invSize );
    				earcutLinked( c, triangles, dim, minX, minY, invSize );
    				return;

    			}

    			b = b.next;

    		}

    		a = a.next;

    	} while ( a !== start );

    }