function getContext( contextNames, contextAttributes ) {

    		for ( let i = 0; i < contextNames.length; i ++ ) {

    			const contextName = contextNames[ i ];
    			const context = _canvas.getContext( contextName, contextAttributes );
    			if ( context !== null ) return context;

    		}

    		return null;

    	}