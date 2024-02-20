function splitPolygon( a, b ) {

    	const a2 = new Node( a.i, a.x, a.y ),
    		b2 = new Node( b.i, b.x, b.y ),
    		an = a.next,
    		bp = b.prev;

    	a.next = b;
    	b.prev = a;

    	a2.next = an;
    	an.prev = a2;

    	b2.next = a2;
    	a2.prev = b2;

    	bp.next = b2;
    	b2.prev = bp;

    	return b2;

    }