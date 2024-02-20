function _getHeightParam(o) {
	// XD reports a lineSpacing of 0 to indicate default spacing.
	// Flutter uses a multiplier against the font size for its "height" value.
	// XD uses a pixel value.
	return (o.lineSpacing === 0 ? "" : `height: ${o.lineSpacing / o.fontSize}, `);
}