function populateProperties( path, value ) {

		// Skip
		var skipRe = /(timeZoneNames\/zone|supplemental\/metaZones|timeZoneNames\/metazone|timeZoneNames\/regionFormat|timeZoneNames\/gmtFormat)/;
		if ( skipRe.test( path ) ) {
			return;
		}

		if ( !value ) {
			return;
		}

		// The `dates` and `calendars` trim's purpose is to reduce properties' key size only.
		path = path.replace( /^.*\/dates\//, "" ).replace( /calendars\//, "" );

		// Specific filter for "gregorian/dayPeriods/format/wide".
		if ( path === "gregorian/dayPeriods/format/wide" ) {
			value = objectFilter( value, /^am|^pm/ );
		}

		// Transform object into array of pairs [key, /value/], sort by desc value length.
		if ( isPlainObject( value ) ) {
			value = Object.keys( value ).map(function( key ) {
				return [ key, new RegExp( "^" + regexpEscape( looseMatching( value[ key ] ) ) ) ];
			}).sort(function( a, b ) {
				return b[ 1 ].source.length - a[ 1 ].source.length;
			});

		// If typeof value === "string".
		} else {
			value = looseMatching( value );
		}
		properties[ path ] = value;
	}