function replaceTextAfter( element, re, text ) {
	replaceContents( findChildAfter( element, re ), text );
}