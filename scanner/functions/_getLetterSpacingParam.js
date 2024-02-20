function _getLetterSpacingParam(o) {
	// Flutter uses pixel values for letterSpacing.
	// XD uses increments of 1/1000 of the font size.
	return (o.charSpacing === 0 ? "" : `letterSpacing: ${o.charSpacing / 1000 * o.fontSize}, `);
}