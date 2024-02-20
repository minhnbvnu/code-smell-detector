function getRectFromContour( contour ) {
		return {
			'top'   : contour.top[0],
			'right' : contour.right[0] + 1,
			'bottom': contour.bottom[0] + 1,
			'left'  : contour.left[0]
		};
	}