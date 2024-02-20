function releaseProgram( program ) {

    		if ( -- program.usedTimes === 0 ) {

    			// Remove from unordered set
    			const i = programs.indexOf( program );
    			programs[ i ] = programs[ programs.length - 1 ];
    			programs.pop();

    			// Free WebGL resources
    			program.destroy();

    		}

    	}