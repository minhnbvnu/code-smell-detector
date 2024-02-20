function pointInTriangle( ax, ay, bx, by, cx, cy, px, py ) {

    	return ( cx - px ) * ( ay - py ) - ( ax - px ) * ( cy - py ) >= 0 &&
    			( ax - px ) * ( by - py ) - ( bx - px ) * ( ay - py ) >= 0 &&
    			( bx - px ) * ( cy - py ) - ( cx - px ) * ( by - py ) >= 0;

    }