function sortLinked( list ) {

    	let i, p, q, e, tail, numMerges, pSize, qSize,
    		inSize = 1;

    	do {

    		p = list;
    		list = null;
    		tail = null;
    		numMerges = 0;

    		while ( p ) {

    			numMerges ++;
    			q = p;
    			pSize = 0;
    			for ( i = 0; i < inSize; i ++ ) {

    				pSize ++;
    				q = q.nextZ;
    				if ( ! q ) break;

    			}

    			qSize = inSize;

    			while ( pSize > 0 || ( qSize > 0 && q ) ) {

    				if ( pSize !== 0 && ( qSize === 0 || ! q || p.z <= q.z ) ) {

    					e = p;
    					p = p.nextZ;
    					pSize --;

    				} else {

    					e = q;
    					q = q.nextZ;
    					qSize --;

    				}

    				if ( tail ) tail.nextZ = e;
    				else list = e;

    				e.prevZ = tail;
    				tail = e;

    			}

    			p = q;

    		}

    		tail.nextZ = null;
    		inSize *= 2;

    	} while ( numMerges > 1 );

    	return list;

    }