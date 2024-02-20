function enableAttributeAndDivisor( attribute, meshPerAttribute ) {

    		const newAttributes = currentState.newAttributes;
    		const enabledAttributes = currentState.enabledAttributes;
    		const attributeDivisors = currentState.attributeDivisors;

    		newAttributes[ attribute ] = 1;

    		if ( enabledAttributes[ attribute ] === 0 ) {

    			gl.enableVertexAttribArray( attribute );
    			enabledAttributes[ attribute ] = 1;

    		}

    		if ( attributeDivisors[ attribute ] !== meshPerAttribute ) {

    			const extension = capabilities.isWebGL2 ? gl : extensions.get( 'ANGLE_instanced_arrays' );

    			extension[ capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE' ]( attribute, meshPerAttribute );
    			attributeDivisors[ attribute ] = meshPerAttribute;

    		}

    	}