function validateLikelySubtags( cldr ) {
	cldr.once( "get", validateCldr );
	cldr.get( "supplemental/likelySubtags" );
}