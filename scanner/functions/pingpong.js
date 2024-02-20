function pingpong( x, length = 1 ) {

    	return length - Math.abs( euclideanModulo( x, length * 2 ) - length );

    }