function smoothstep( x, min, max ) {

    	if ( x <= min ) return 0;
    	if ( x >= max ) return 1;

    	x = ( x - min ) / ( max - min );

    	return x * x * ( 3 - 2 * x );

    }