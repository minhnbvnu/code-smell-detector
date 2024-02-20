function unionBounds( a, b, target ) {

    	let aVal, bVal;
    	for ( let d = 0; d < 3; d ++ ) {

    		const d3 = d + 3;

    		// set the minimum values
    		aVal = a[ d ];
    		bVal = b[ d ];
    		target[ d ] = aVal < bVal ? aVal : bVal;

    		// set the max values
    		aVal = a[ d3 ];
    		bVal = b[ d3 ];
    		target[ d3 ] = aVal > bVal ? aVal : bVal;

    	}

    }