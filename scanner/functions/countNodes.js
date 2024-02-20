function countNodes( node ) {

    		if ( node.count ) {

    			return 1;

    		} else {

    			return 1 + countNodes( node.left ) + countNodes( node.right );

    		}

    	}