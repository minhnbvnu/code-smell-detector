function customComparison( ordering, a, b ) {
	let ai = ordering.indexOf( a );
	let bi = ordering.indexOf( b );
	if ( ai === -1 ) ai = Infinity;
	if ( bi === -1 ) bi = Infinity;
	return ai - bi;
}