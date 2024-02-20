function triggerProgress( trianglesProcessed ) {

    		if ( onProgress ) {

    			onProgress( trianglesProcessed / totalTriangles );

    		}

    	}