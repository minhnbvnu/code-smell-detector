function releaseStatesOfGeometry( geometry ) {

    		if ( bindingStates[ geometry.id ] === undefined ) return;

    		const programMap = bindingStates[ geometry.id ];

    		for ( const programId in programMap ) {

    			const stateMap = programMap[ programId ];

    			for ( const wireframe in stateMap ) {

    				deleteVertexArrayObject( stateMap[ wireframe ].object );

    				delete stateMap[ wireframe ];

    			}

    			delete programMap[ programId ];

    		}

    		delete bindingStates[ geometry.id ];

    	}