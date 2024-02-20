function onGeometryDispose( event ) {

    		const geometry = event.target;

    		if ( geometry.index !== null ) {

    			attributes.remove( geometry.index );

    		}

    		for ( const name in geometry.attributes ) {

    			attributes.remove( geometry.attributes[ name ] );

    		}

    		geometry.removeEventListener( 'dispose', onGeometryDispose );

    		delete geometries[ geometry.id ];

    		const attribute = wireframeAttributes.get( geometry );

    		if ( attribute ) {

    			attributes.remove( attribute );
    			wireframeAttributes.delete( geometry );

    		}

    		bindingStates.releaseStatesOfGeometry( geometry );

    		if ( geometry.isInstancedBufferGeometry === true ) {

    			delete geometry._maxInstanceCount;

    		}

    		//

    		info.memory.geometries --;

    	}