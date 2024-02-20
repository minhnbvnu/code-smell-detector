function CubicBezierP1( t, p ) {

    	const k = 1 - t;
    	return 3 * k * k * t * p;

    }