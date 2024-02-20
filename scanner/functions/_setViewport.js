function _setViewport( target, x, y, width, height ) {

    	target.viewport.set( x, y, width, height );
    	target.scissor.set( x, y, width, height );

    }