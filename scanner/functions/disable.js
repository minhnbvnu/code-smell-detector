function disable( id ) {

    		if ( enabledCapabilities[ id ] !== false ) {

    			gl.disable( id );
    			enabledCapabilities[ id ] = false;

    		}

    	}