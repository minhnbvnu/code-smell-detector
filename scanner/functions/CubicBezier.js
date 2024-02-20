function CubicBezier( t, p0, p1, p2, p3 ) {

    	return CubicBezierP0( t, p0 ) + CubicBezierP1( t, p1 ) + CubicBezierP2( t, p2 ) +
    		CubicBezierP3( t, p3 );

    }