function eliminateHole( hole, outerNode ) {

    	outerNode = findHoleBridge( hole, outerNode );
    	if ( outerNode ) {

    		const b = splitPolygon( outerNode, hole );

    		// filter collinear points around the cuts
    		filterPoints( outerNode, outerNode.next );
    		filterPoints( b, b.next );

    	}

    }