function _getLinearGradient(fill, opacity=1) {
	return 'LinearGradient('+
		`begin: ${getAlignment(fill.startX, fill.startY)},` +
		`end: ${getAlignment(fill.endX, fill.endY)},` +
		_getColorsParam(fill.colorStops, opacity) +
	')';
}