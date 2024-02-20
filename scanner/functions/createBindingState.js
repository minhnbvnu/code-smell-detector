function createBindingState( vao ) {

    		const newAttributes = [];
    		const enabledAttributes = [];
    		const attributeDivisors = [];

    		for ( let i = 0; i < maxVertexAttributes; i ++ ) {

    			newAttributes[ i ] = 0;
    			enabledAttributes[ i ] = 0;
    			attributeDivisors[ i ] = 0;

    		}

    		return {

    			// for backward compatibility on non-VAO support browser
    			geometry: null,
    			program: null,
    			wireframe: false,

    			newAttributes: newAttributes,
    			enabledAttributes: enabledAttributes,
    			attributeDivisors: attributeDivisors,
    			object: vao,
    			attributes: {},
    			index: null

    		};

    	}