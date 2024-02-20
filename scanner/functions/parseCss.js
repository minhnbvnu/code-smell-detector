function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}