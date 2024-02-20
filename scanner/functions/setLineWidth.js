function setLineWidth( width ) {

    		if ( width !== currentLineWidth ) {

    			if ( lineWidthAvailable ) gl.lineWidth( width );

    			currentLineWidth = width;

    		}

    	}