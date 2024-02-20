function onInstancedMeshDispose( event ) {

    		const instancedMesh = event.target;

    		instancedMesh.removeEventListener( 'dispose', onInstancedMeshDispose );

    		attributes.remove( instancedMesh.instanceMatrix );

    		if ( instancedMesh.instanceColor !== null ) attributes.remove( instancedMesh.instanceColor );

    	}