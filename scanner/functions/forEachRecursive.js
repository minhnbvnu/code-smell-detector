function forEachRecursive( object, callback ) {
	for ( let key in object ) {
		const value = object[ key ];
		if ( Object( value ) === value ) {
			forEachRecursive( value, callback );
		} else {
			callback( object, key, value );
		}
	}
}