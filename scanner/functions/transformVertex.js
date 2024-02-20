function transformVertex( vertexPosition, mvPosition, center, scale, sin, cos ) {

    	// compute position in camera space
    	_alignedPosition.subVectors( vertexPosition, center ).addScalar( 0.5 ).multiply( scale );

    	// to check if rotation is not zero
    	if ( sin !== undefined ) {

    		_rotatedPosition.x = ( cos * _alignedPosition.x ) - ( sin * _alignedPosition.y );
    		_rotatedPosition.y = ( sin * _alignedPosition.x ) + ( cos * _alignedPosition.y );

    	} else {

    		_rotatedPosition.copy( _alignedPosition );

    	}


    	vertexPosition.copy( mvPosition );
    	vertexPosition.x += _rotatedPosition.x;
    	vertexPosition.y += _rotatedPosition.y;

    	// transform to world space
    	vertexPosition.applyMatrix4( _viewWorldMatrix );

    }