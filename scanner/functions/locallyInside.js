function locallyInside( a, b ) {

    	return area( a.prev, a, a.next ) < 0 ?
    		area( a, b, a.next ) >= 0 && area( a, a.prev, b ) >= 0 :
    		area( a, b, a.prev ) < 0 || area( a, a.next, b ) < 0;

    }