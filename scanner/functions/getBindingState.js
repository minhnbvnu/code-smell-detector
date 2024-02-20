function getBindingState( geometry, program, material ) {

    		const wireframe = ( material.wireframe === true );

    		let programMap = bindingStates[ geometry.id ];

    		if ( programMap === undefined ) {

    			programMap = {};
    			bindingStates[ geometry.id ] = programMap;

    		}

    		let stateMap = programMap[ program.id ];

    		if ( stateMap === undefined ) {

    			stateMap = {};
    			programMap[ program.id ] = stateMap;

    		}

    		let state = stateMap[ wireframe ];

    		if ( state === undefined ) {

    			state = createBindingState( createVertexArrayObject() );
    			stateMap[ wireframe ] = state;

    		}

    		return state;

    	}