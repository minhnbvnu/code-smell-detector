function enable( id ) {

    		if ( enabledCapabilities[ id ] !== true ) {

    			gl.enable( id );
    			enabledCapabilities[ id ] = true;

    		}

    	}