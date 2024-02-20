function earcutLinked( ear, triangles, dim, minX, minY, invSize, pass ) {

    	if ( ! ear ) return;

    	// interlink polygon nodes in z-order
    	if ( ! pass && invSize ) indexCurve( ear, minX, minY, invSize );

    	let stop = ear,
    		prev, next;

    	// iterate through ears, slicing them one by one
    	while ( ear.prev !== ear.next ) {

    		prev = ear.prev;
    		next = ear.next;

    		if ( invSize ? isEarHashed( ear, minX, minY, invSize ) : isEar( ear ) ) {

    			// cut off the triangle
    			triangles.push( prev.i / dim );
    			triangles.push( ear.i / dim );
    			triangles.push( next.i / dim );

    			removeNode( ear );

    			// skipping the next vertex leads to less sliver triangles
    			ear = next.next;
    			stop = next.next;

    			continue;

    		}

    		ear = next;

    		// if we looped through the whole remaining polygon and can't find any more ears
    		if ( ear === stop ) {

    			// try filtering points and slicing again
    			if ( ! pass ) {

    				earcutLinked( filterPoints( ear ), triangles, dim, minX, minY, invSize, 1 );

    				// if this didn't work, try curing all small self-intersections locally

    			} else if ( pass === 1 ) {

    				ear = cureLocalIntersections( filterPoints( ear ), triangles, dim );
    				earcutLinked( ear, triangles, dim, minX, minY, invSize, 2 );

    				// as a last resort, try splitting the remaining polygon into two

    			} else if ( pass === 2 ) {

    				splitEarcut( ear, triangles, dim, minX, minY, invSize );

    			}

    			break;

    		}

    	}

    }