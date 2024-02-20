function parseNumberArray( value ) {

		var array = value.split( ',' ).map( function ( val ) {

			return parseFloat( val );

		} );

		return array;

	}