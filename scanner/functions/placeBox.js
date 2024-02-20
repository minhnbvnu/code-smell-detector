function placeBox(boxWidth, boxHeight, outerLeft, outerTop, outerWidth, outerHeight, point, distance, preferRight) {
	
	// keep the box within the chart area
	var pointX = point.x,
		pointY = point.y,
		x = pointX + outerLeft + (preferRight ? distance : -boxWidth - distance),
		y = pointY - boxHeight + outerTop + 15, // 15 means the point is 15 pixels up from the bottom of the tooltip
		alignedRight;

	// it is too far to the left, adjust it
	if (x < 7) {
		x = outerLeft + pointX + distance;
	}

	// Test to see if the tooltip is too far to the right,
	// if it is, move it back to be inside and then up to not cover the point.
	if ((x + boxWidth) > (outerLeft + outerWidth)) {
		x -= (x + boxWidth) - (outerLeft + outerWidth);
		y = pointY - boxHeight + outerTop - distance;
		alignedRight = true;
	}

	// if it is now above the plot area, align it to the top of the plot area
	if (y < outerTop + 5) {
		y = outerTop + 5;

		// If the tooltip is still covering the point, move it below instead
		if (alignedRight && pointY >= y && pointY <= (y + boxHeight)) {
			y = pointY + outerTop + distance; // below
		}
	} else if (y + boxHeight > outerTop + outerHeight) {
		y = outerTop + outerHeight - boxHeight - distance; // below
	}

	return {x: x, y: y};
}