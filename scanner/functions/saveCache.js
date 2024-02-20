function saveCache( geometry, index ) {

    		const cache = {};
    		const attributes = geometry.attributes;
    		let attributesNum = 0;

    		for ( const key in attributes ) {

    			const attribute = attributes[ key ];

    			const data = {};
    			data.attribute = attribute;

    			if ( attribute.data ) {

    				data.data = attribute.data;

    			}

    			cache[ key ] = data;

    			attributesNum ++;

    		}

    		currentState.attributes = cache;
    		currentState.attributesNum = attributesNum;

    		currentState.index = index;

    	}