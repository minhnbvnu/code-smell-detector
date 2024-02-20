function registerLoggingCallback( key ) {
	return function( callback ) {
		config[key].push( callback );
	};
}