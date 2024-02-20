function setFlipSided( flipSided ) {

    		if ( currentFlipSided !== flipSided ) {

    			if ( flipSided ) {

    				gl.frontFace( 2304 );

    			} else {

    				gl.frontFace( 2305 );

    			}

    			currentFlipSided = flipSided;

    		}

    	}