function intersectObject( object, raycaster, intersects, recursive ) {

    	if ( object.layers.test( raycaster.layers ) ) {

    		object.raycast( raycaster, intersects );

    	}

    	if ( recursive === true ) {

    		const children = object.children;

    		for ( let i = 0, l = children.length; i < l; i ++ ) {

    			intersectObject( children[ i ], raycaster, intersects, true );

    		}

    	}

    }