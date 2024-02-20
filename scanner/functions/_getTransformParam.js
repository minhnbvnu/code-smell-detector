function _getTransformParam(fill, mtx) {
	// The GradientXDTransform is needed even if there is no transformation in order to fix the aspect ratio.
	let o = mtx || fill.gradientTransform;
	return 'transform: GradientXDTransform(' +
		`${$.fix(o.a, 3)}, ${$.fix(o.b, 3)}, ${$.fix(o.c, 3)}, ` +
		`${$.fix(o.d, 3)}, ${$.fix(o.e, 3)}, ${$.fix(o.f, 3)}, ` +
		`${getAlignment(fill.startX, fill.startY)}), `;
}