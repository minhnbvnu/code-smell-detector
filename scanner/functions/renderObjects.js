function renderObjects( renderList, scene, camera ) {

    		const overrideMaterial = scene.isScene === true ? scene.overrideMaterial : null;

    		for ( let i = 0, l = renderList.length; i < l; i ++ ) {

    			const renderItem = renderList[ i ];

    			const object = renderItem.object;
    			const geometry = renderItem.geometry;
    			const material = overrideMaterial === null ? renderItem.material : overrideMaterial;
    			const group = renderItem.group;

    			if ( object.layers.test( camera.layers ) ) {

    				renderObject( object, scene, camera, geometry, material, group );

    			}

    		}

    	}