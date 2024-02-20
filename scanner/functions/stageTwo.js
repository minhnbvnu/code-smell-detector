function stageTwo ( file ) {
    // Google Analytics event - heatmap upload file
    ga('send', 'event', 'Heatmap', 'upload', undefined, file.size);

		heat = L.heatLayer( [], heatOptions ).addTo( map );

		var type;

		try {
			if ( /\.kml$/i.test( file.name ) ) {
				type = 'kml';
			} else {
				type = 'json';
			}
		} catch ( ex ) {
			status( 'Something went wrong generating your map. Ensure you\'re uploading a Google Takeout JSON file that contains location data and try again, or create an issue on GitHub if the problem persists. ( error: ' + ex.message + ' )' );
			return;
		}

		// First, change tabs
		$( 'body' ).addClass( 'working' );
		$( '#intro' ).addClass( 'hidden' );
		$( '#working' ).removeClass( 'hidden' );

		var SCALAR_E7 = 0.0000001; // Since Google Takeout stores latlngs as integers
		var latlngs = [];

		var os = new oboe();

		os.node( 'locations.*', function ( location ) {
			var latitude = location.latitudeE7 * SCALAR_E7,
				longitude = location.longitudeE7 * SCALAR_E7;

			// Handle negative latlngs due to google unsigned/signed integer bug.
			if ( latitude > 180 ) latitude = latitude - (2 ** 32) * SCALAR_E7;
			if ( longitude > 180 ) longitude = longitude - (2 ** 32) * SCALAR_E7;

			if ( type === 'json' ) latlngs.push( [ latitude, longitude ] );
			return oboe.drop;
		} ).done( function () {
			status( 'Generating map...' );
			heat._latlngs = latlngs;

			heat.redraw();
			stageThree(  /* numberProcessed */ latlngs.length );

		} );

		var fileSize = prettySize( file.size );

		status( 'Preparing to import file ( ' + fileSize + ' )...' );

		// Now start working!
		if ( type === 'json' ) parseJSONFile( file, os );
		if ( type === 'kml' ) parseKMLFile( file );
	}