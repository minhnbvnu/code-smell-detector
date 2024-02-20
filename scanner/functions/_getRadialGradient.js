function _getRadialGradient(fill, opacity=1) {
	// Flutter always draws relative to the shortest edge, whereas XD draws the gradient
	// stretched to the aspect ratio of its container.
	return 'RadialGradient('+
		`center: ${getAlignment(fill.startX, fill.startY)}, ` +
		(fill.startX === fill.endX && fill.startY === fill.endY ? '' :
			`focal: ${getAlignment(fill.endX, fill.endY)}, `) +
		(fill.startR === 0 ? '' : `focalRadius: ${$.fix(fill.startR, 3)}, `) +
		`radius: ${$.fix(fill.endR, 3)}, ` +
		_getColorsParam(fill.colorStops, opacity) +
		_getTransformParam(fill) +
	')';
}