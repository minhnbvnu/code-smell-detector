function getWireframeAttribute( geometry ) {

    		const currentAttribute = wireframeAttributes.get( geometry );

    		if ( currentAttribute ) {

    			const geometryIndex = geometry.index;

    			if ( geometryIndex !== null ) {

    				// if the attribute is obsolete, create a new one

    				if ( currentAttribute.version < geometryIndex.version ) {

    					updateWireframeAttribute( geometry );

    				}

    			}

    		} else {

    			updateWireframeAttribute( geometry );

    		}

    		return wireframeAttributes.get( geometry );

    	}