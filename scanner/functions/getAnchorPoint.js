function getAnchorPoint(untransformedBounds, matrix, hAlign, vAlign, sx, sy) {
	var center_x = (untransformedBounds[0] + untransformedBounds[2]) * 0.5,
		center_y = (untransformedBounds[1] + untransformedBounds[3]) * 0.5,
		anchor_x = (hAlign == 'left' ? untransformedBounds[0] :
			(hAlign == 'center' ? center_x : untransformedBounds[2])),
		anchor_y = (vAlign == 'top' ? untransformedBounds[1] :
			(vAlign == 'bottom' ? untransformedBounds[3] : center_y)),
		anchor_dx = (anchor_x - center_x),
		anchor_dy = (anchor_y - center_y);

	var mat = app.concatenateMatrix(app.getScaleMatrix(sx*100, sy*100), matrix);

	var t_anchor_x = center_x + mat.mValueA * anchor_dx + mat.mValueC * anchor_dy,
		t_anchor_y = center_y + mat.mValueB * anchor_dx + mat.mValueD * anchor_dy;

	return [t_anchor_x, t_anchor_y];
}