function getRootIndexRanges( geo ) {

    	if ( ! geo.groups || ! geo.groups.length ) {

    		return [ { offset: 0, count: geo.index.count / 3 } ];

    	}

    	const ranges = [];
    	const rangeBoundaries = new Set();
    	for ( const group of geo.groups ) {

    		rangeBoundaries.add( group.start );
    		rangeBoundaries.add( group.start + group.count );

    	}

    	// note that if you don't pass in a comparator, it sorts them lexicographically as strings :-(
    	const sortedBoundaries = Array.from( rangeBoundaries.values() ).sort( ( a, b ) => a - b );
    	for ( let i = 0; i < sortedBoundaries.length - 1; i ++ ) {

    		const start = sortedBoundaries[ i ], end = sortedBoundaries[ i + 1 ];
    		ranges.push( { offset: ( start / 3 ), count: ( end - start ) / 3 } );

    	}

    	return ranges;

    }