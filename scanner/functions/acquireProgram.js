function acquireProgram( parameters, cacheKey ) {

    		let program;

    		// Check if code has been already compiled
    		for ( let p = 0, pl = programs.length; p < pl; p ++ ) {

    			const preexistingProgram = programs[ p ];

    			if ( preexistingProgram.cacheKey === cacheKey ) {

    				program = preexistingProgram;
    				++ program.usedTimes;

    				break;

    			}

    		}

    		if ( program === undefined ) {

    			program = new WebGLProgram( renderer, cacheKey, parameters, bindingStates );
    			programs.push( program );

    		}

    		return program;

    	}