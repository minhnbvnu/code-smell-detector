function synchronize( callback, last ) {
	config.queue.push( callback );

	if ( config.autorun && !config.blocking ) {
		process( last );
	}
}