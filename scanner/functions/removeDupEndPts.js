function removeDupEndPts( points ) {

    	const l = points.length;

    	if ( l > 2 && points[ l - 1 ].equals( points[ 0 ] ) ) {

    		points.pop();

    	}

    }