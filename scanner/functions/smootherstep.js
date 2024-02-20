function smootherstep( x, min, max ) {

    	if ( x <= min ) return 0;
    	if ( x >= max ) return 1;

    	x = ( x - min ) / ( max - min );

    	return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

    }