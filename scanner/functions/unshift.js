function unshift( object, geometry, material, groupOrder, z, group ) {

    		const renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

    		if ( material.transmission > 0.0 ) {

    			transmissive.unshift( renderItem );

    		} else if ( material.transparent === true ) {

    			transparent.unshift( renderItem );

    		} else {

    			opaque.unshift( renderItem );

    		}

    	}