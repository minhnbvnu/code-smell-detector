function toggleClass( elem, name ) {
	if ( hasClass( elem, name ) ) {
		removeClass( elem, name );
	} else {
		addClass( elem, name );
	}
}