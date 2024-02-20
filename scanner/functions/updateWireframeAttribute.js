function updateWireframeAttribute( geometry ) {

    		const indices = [];

    		const geometryIndex = geometry.index;
    		const geometryPosition = geometry.attributes.position;
    		let version = 0;

    		if ( geometryIndex !== null ) {

    			const array = geometryIndex.array;
    			version = geometryIndex.version;

    			for ( let i = 0, l = array.length; i < l; i += 3 ) {

    				const a = array[ i + 0 ];
    				const b = array[ i + 1 ];
    				const c = array[ i + 2 ];

    				indices.push( a, b, b, c, c, a );

    			}

    		} else {

    			const array = geometryPosition.array;
    			version = geometryPosition.version;

    			for ( let i = 0, l = ( array.length / 3 ) - 1; i < l; i += 3 ) {

    				const a = i + 0;
    				const b = i + 1;
    				const c = i + 2;

    				indices.push( a, b, b, c, c, a );

    			}

    		}

    		const attribute = new ( arrayMax( indices ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );
    		attribute.version = version;

    		// Updating index buffer in VAO now. See WebGLBindingStates

    		//

    		const previousAttribute = wireframeAttributes.get( geometry );

    		if ( previousAttribute ) attributes.remove( previousAttribute );

    		//

    		wireframeAttributes.set( geometry, attribute );

    	}