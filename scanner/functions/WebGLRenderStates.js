function WebGLRenderStates( extensions, capabilities ) {

    	let renderStates = new WeakMap();

    	function get( scene, renderCallDepth = 0 ) {

    		let renderState;

    		if ( renderStates.has( scene ) === false ) {

    			renderState = new WebGLRenderState( extensions, capabilities );
    			renderStates.set( scene, [ renderState ] );

    		} else {

    			if ( renderCallDepth >= renderStates.get( scene ).length ) {

    				renderState = new WebGLRenderState( extensions, capabilities );
    				renderStates.get( scene ).push( renderState );

    			} else {

    				renderState = renderStates.get( scene )[ renderCallDepth ];

    			}

    		}

    		return renderState;

    	}

    	function dispose() {

    		renderStates = new WeakMap();

    	}

    	return {
    		get: get,
    		dispose: dispose
    	};

    }