function stripPluralGarbage( data ) {
	var aux, pluralCount;

	if ( data ) {
		aux = {};
		for ( pluralCount in data ) {
			aux[ pluralCount.replace( /unitPattern-count-/, "" ) ] = data[ pluralCount ];
		}
	}

	return aux;
}