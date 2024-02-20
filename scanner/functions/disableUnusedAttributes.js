function disableUnusedAttributes() {

    		const newAttributes = currentState.newAttributes;
    		const enabledAttributes = currentState.enabledAttributes;

    		for ( let i = 0, il = enabledAttributes.length; i < il; i ++ ) {

    			if ( enabledAttributes[ i ] !== newAttributes[ i ] ) {

    				gl.disableVertexAttribArray( i );
    				enabledAttributes[ i ] = 0;

    			}

    		}

    	}