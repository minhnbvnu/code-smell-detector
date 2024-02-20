function QuadraticBezier( t, p0, p1, p2 ) {

    	return QuadraticBezierP0( t, p0 ) + QuadraticBezierP1( t, p1 ) +
    		QuadraticBezierP2( t, p2 );

    }