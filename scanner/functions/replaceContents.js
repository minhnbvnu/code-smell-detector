function replaceContents( element, text ) {
	element.innerHTML = text;
	element.classList.add( 'changed' );
	clearTimeout( element.timeout );
	element.timeout = setTimeout( () => {
		element.classList.remove( 'changed' );
	}, 30 );
}