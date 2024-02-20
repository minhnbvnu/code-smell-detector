function addClass( elem, name ) {
	if ( !hasClass( elem, name ) ) {
		elem.className += (elem.className ? " " : "") + name;
	}
}