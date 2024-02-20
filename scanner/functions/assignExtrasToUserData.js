function assignExtrasToUserData( object, gltfDef ) {

    	if ( gltfDef.extras !== undefined ) {

    		if ( typeof gltfDef.extras === 'object' ) {

    			Object.assign( object.userData, gltfDef.extras );

    		} else {

    			console.warn( 'THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras );

    		}

    	}

    }