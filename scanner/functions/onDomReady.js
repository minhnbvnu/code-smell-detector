function onDomReady( fn ) {
	        // If DOM is ready, execute the function (async), otherwise wait
	        isReady ? defer( fn ) : callbacks.push( fn );
	    }