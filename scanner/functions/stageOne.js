function stageOne () {
		var dropzone;

		// Initialize the map
		map = L.map( 'map' ).setView( [0,0], 2 );
		L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'location-history-visualizer is open source and available <a href="https://github.com/theopolisme/location-history-visualizer">on GitHub</a>. Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.',
			maxZoom: 18,
			minZoom: 2
		} ).addTo( map );

		// Initialize the dropzone
		dropzone = new Dropzone( document.body, {
			url: '/',
			previewsContainer: document.createElement( 'div' ), // >> /dev/null
			clickable: false,
			accept: function ( file, done ) {
				stageTwo( file );
				dropzone.disable(); // Your job is done, buddy
			}
		} );

		// For mobile browsers, allow direct file selection as well
		$( '#file' ).change( function () {
			stageTwo( this.files[0] );
			dropzone.disable();
		} );
	}