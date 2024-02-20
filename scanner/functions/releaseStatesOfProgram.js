function releaseStatesOfProgram( program ) {

    		for ( const geometryId in bindingStates ) {

    			const programMap = bindingStates[ geometryId ];

    			if ( programMap[ program.id ] === undefined ) continue;

    			const stateMap = programMap[ program.id ];

    			for ( const wireframe in stateMap ) {

    				deleteVertexArrayObject( stateMap[ wireframe ].object );

    				delete stateMap[ wireframe ];

    			}

    			delete programMap[ program.id ];

    		}

    	}