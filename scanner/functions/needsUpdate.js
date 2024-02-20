function needsUpdate( geometry, index ) {

    		const cachedAttributes = currentState.attributes;
    		const geometryAttributes = geometry.attributes;

    		let attributesNum = 0;

    		for ( const key in geometryAttributes ) {

    			const cachedAttribute = cachedAttributes[ key ];
    			const geometryAttribute = geometryAttributes[ key ];

    			if ( cachedAttribute === undefined ) return true;

    			if ( cachedAttribute.attribute !== geometryAttribute ) return true;

    			if ( cachedAttribute.data !== geometryAttribute.data ) return true;

    			attributesNum ++;

    		}

    		if ( currentState.attributesNum !== attributesNum ) return true;

    		if ( currentState.index !== index ) return true;

    		return false;

    	}