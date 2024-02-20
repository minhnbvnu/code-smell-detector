function addEvents( elems, type, fn ) {
	var i = elems.length;
	while ( i-- ) {
		addEvent( elems[i], type, fn );
	}
}