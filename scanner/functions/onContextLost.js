function onContextLost( event ) {

    		event.preventDefault();

    		console.log( 'THREE.WebGLRenderer: Context Lost.' );

    		_isContextLost = true;

    	}