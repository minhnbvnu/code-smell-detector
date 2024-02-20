function isMergeable(grid, contour, isSelected) {
		var mergeable = true;
		if (   -1 !== Utils.indexOfAnyBut( contour.top   , contour.top[0]    )
			|| -1 !== Utils.indexOfAnyBut( contour.right , contour.right[0]  )
			|| -1 !== Utils.indexOfAnyBut( contour.bottom, contour.bottom[0] )
			|| -1 !== Utils.indexOfAnyBut( contour.left  , contour.left[0]   ) ) {
			// the outside of the selected area is jagged (not a rectangle)
			mergeable = false;
		} else {
			// the outside of the selected area is a rectangle, but we
			// must also ensore that there are no holes in the selection
			var rect = getRectFromContour( contour )
			Utils.walkGridInsideRect( grid, rect, function ( cellInfo ) {
				if ( ! isSelected( cellInfo ) ) {
					mergeable = false;
					return false;
				}
			});
		}
		return mergeable;
	}