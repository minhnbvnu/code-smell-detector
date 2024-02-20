function WebGLRenderLists( properties ) {

    	let lists = new WeakMap();

    	function get( scene, renderCallDepth ) {

    		let list;

    		if ( lists.has( scene ) === false ) {

    			list = new WebGLRenderList( properties );
    			lists.set( scene, [ list ] );

    		} else {

    			if ( renderCallDepth >= lists.get( scene ).length ) {

    				list = new WebGLRenderList( properties );
    				lists.get( scene ).push( list );

    			} else {

    				list = lists.get( scene )[ renderCallDepth ];

    			}

    		}

    		return list;

    	}

    	function dispose() {

    		lists = new WeakMap();

    	}

    	return {
    		get: get,
    		dispose: dispose
    	};

    }