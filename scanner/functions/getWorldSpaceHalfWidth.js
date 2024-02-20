function getWorldSpaceHalfWidth( camera, distance, lineWidth, resolution ) {

    	// transform into clip space, adjust the x and y values by the pixel width offset, then
    	// transform back into world space to get world offset. Note clip space is [-1, 1] so full
    	// width does not need to be halved.
    	_clipToWorldVector.set( 0, 0, - distance, 1.0 ).applyMatrix4( camera.projectionMatrix );
    	_clipToWorldVector.multiplyScalar( 1.0 / _clipToWorldVector.w );
    	_clipToWorldVector.x = lineWidth / resolution.width;
    	_clipToWorldVector.y = lineWidth / resolution.height;
    	_clipToWorldVector.applyMatrix4( camera.projectionMatrixInverse );
    	_clipToWorldVector.multiplyScalar( 1.0 / _clipToWorldVector.w );

    	return Math.abs( Math.max( _clipToWorldVector.x, _clipToWorldVector.y ) );

    }