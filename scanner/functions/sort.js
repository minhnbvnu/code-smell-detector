function sort( customOpaqueSort, customTransparentSort ) {

    		if ( opaque.length > 1 ) opaque.sort( customOpaqueSort || painterSortStable );
    		if ( transmissive.length > 1 ) transmissive.sort( customTransparentSort || reversePainterSortStable );
    		if ( transparent.length > 1 ) transparent.sort( customTransparentSort || reversePainterSortStable );

    	}