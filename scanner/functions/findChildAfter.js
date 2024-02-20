function findChildAfter( element, re ) {
	let str = '';
	for ( let i = 0; i < element.childNodes.length; i++ ) {
		const node = element.childNodes.item( i );
		if ( node instanceof Text ) {
			str += node.nodeValue;
		} else {
			if ( re.test( str ) ) {
				return node;
			}
			str += node.innerText;
		}
	}
	console.error( "Couldn't find element after " + re );
}