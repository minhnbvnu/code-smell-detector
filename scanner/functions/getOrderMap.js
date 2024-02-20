function getOrderMap() {
	var map = {},
		index = 0;

	function walk( items, prefix ) {
		items.forEach(function( item ) {
			if ( typeof item === "object" ) {
				var page = Object.keys( item )[ 0 ];
				map[ prefix + page ] = ++index;
				walk( item[ page ], prefix + page + "/" );
			} else {
				map[ prefix + item ] = ++index;
			}
		});
	}

	walk( require( "./order" ), "" );

	return map;
}