function viewport( viewport ) {

    		if ( currentViewport.equals( viewport ) === false ) {

    			gl.viewport( viewport.x, viewport.y, viewport.z, viewport.w );
    			currentViewport.copy( viewport );

    		}

    	}