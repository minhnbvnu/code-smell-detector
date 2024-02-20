function addContour( vertices, contour ) {

    	for ( let i = 0; i < contour.length; i ++ ) {

    		vertices.push( contour[ i ].x );
    		vertices.push( contour[ i ].y );

    	}

    }