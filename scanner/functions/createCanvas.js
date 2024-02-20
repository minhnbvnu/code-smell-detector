function createCanvas( width, height ) {

    		// Use OffscreenCanvas when available. Specially needed in web workers

    		return useOffscreenCanvas ?
    			new OffscreenCanvas( width, height ) : createElementNS( 'canvas' );

    	}