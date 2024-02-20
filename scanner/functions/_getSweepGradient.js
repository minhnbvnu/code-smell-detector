function _getSweepGradient(fill, opacity=1) {
	// Flutter's SweepGradient always starts at 0 deg (right). `startAngle` only affects color placement.
	// Also, `transform` is multiplied against the `center`.
	// As such, we need to rotate & move the gradient via GradientXDTransform
	
	return 'SweepGradient('+
		`center: ${getAlignment(fill.startX, fill.startY)}, ` +
		`startAngle: 0.0, endAngle: ${$.fix(Math.PI*2, 4)}, ` +
		_getColorsParam(fill.colorStops, opacity) +
		_getTransformParam(fill, _getRotationMtx(fill.rotation / 180 * Math.PI)) +
	')';
}