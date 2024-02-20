function damp( x, y, lambda, dt ) {

    	return lerp( x, y, 1 - Math.exp( - lambda * dt ) );

    }