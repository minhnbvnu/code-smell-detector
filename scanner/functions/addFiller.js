function addFiller( g ) {
	const nested = getDepth( g ) > 0 ? 'Nested ' : '';
	g.add( { x: 0.5 }, 'x', 0, 1 ).name( `${nested}Slider` );
	g.add( { x: true }, 'x' ).name( `${nested}Boolean` );
	g.add( { x: function() { } }, 'x' ).name( `${nested}Button` );
}