function mergeUniforms( uniforms ) {

    	const merged = {};

    	for ( let u = 0; u < uniforms.length; u ++ ) {

    		const tmp = cloneUniforms( uniforms[ u ] );

    		for ( const p in tmp ) {

    			merged[ p ] = tmp[ p ];

    		}

    	}

    	return merged;

    }