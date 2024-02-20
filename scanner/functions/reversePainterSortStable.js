function reversePainterSortStable( a, b ) {

    	if ( a.groupOrder !== b.groupOrder ) {

    		return a.groupOrder - b.groupOrder;

    	} else if ( a.renderOrder !== b.renderOrder ) {

    		return a.renderOrder - b.renderOrder;

    	} else if ( a.z !== b.z ) {

    		return b.z - a.z;

    	} else {

    		return a.id - b.id;

    	}

    }