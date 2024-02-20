function releaseMaterialProgramReferences( material ) {

    		const programs = properties.get( material ).programs;

    		if ( programs !== undefined ) {

    			programs.forEach( function ( program ) {

    				programCache.releaseProgram( program );

    			} );

    		}

    	}