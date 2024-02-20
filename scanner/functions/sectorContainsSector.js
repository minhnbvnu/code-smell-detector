function sectorContainsSector( m, p ) {

    	return area( m.prev, m, p.prev ) < 0 && area( p.next, m, m.next ) < 0;

    }