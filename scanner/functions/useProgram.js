function useProgram( program ) {

    		if ( currentProgram !== program ) {

    			gl.useProgram( program );

    			currentProgram = program;

    			return true;

    		}

    		return false;

    	}