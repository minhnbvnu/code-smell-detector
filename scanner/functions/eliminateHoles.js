function eliminateHoles( data, holeIndices, outerNode, dim ) {

    	const queue = [];
    	let i, len, start, end, list;

    	for ( i = 0, len = holeIndices.length; i < len; i ++ ) {

    		start = holeIndices[ i ] * dim;
    		end = i < len - 1 ? holeIndices[ i + 1 ] * dim : data.length;
    		list = linkedList( data, start, end, dim, false );
    		if ( list === list.next ) list.steiner = true;
    		queue.push( getLeftmost( list ) );

    	}

    	queue.sort( compareX );

    	// process holes from left to right
    	for ( i = 0; i < queue.length; i ++ ) {

    		eliminateHole( queue[ i ], outerNode );
    		outerNode = filterPoints( outerNode, outerNode.next );

    	}

    	return outerNode;

    }