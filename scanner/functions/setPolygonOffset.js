function setPolygonOffset( polygonOffset, factor, units ) {

    		if ( polygonOffset ) {

    			enable( 32823 );

    			if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

    				gl.polygonOffset( factor, units );

    				currentPolygonOffsetFactor = factor;
    				currentPolygonOffsetUnits = units;

    			}

    		} else {

    			disable( 32823 );

    		}

    	}