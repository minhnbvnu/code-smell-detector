function inverseLerp( x, y, value ) {

    	if ( x !== y ) {

    		return ( value - x ) / ( y - x );

    	} else {

    		return 0;

    	}

    }