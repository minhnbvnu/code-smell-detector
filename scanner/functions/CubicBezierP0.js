function CubicBezierP0( t, p ) {

    	const k = 1 - t;
    	return k * k * k * p;

    }