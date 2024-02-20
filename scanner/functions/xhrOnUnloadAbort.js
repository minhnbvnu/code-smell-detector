function xhrOnUnloadAbort() {
	jQuery( window ).unload(function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	});
}