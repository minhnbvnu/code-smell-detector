function forcePositionIntoWindow(position) {
		var left = position.left;
		var top = position.top;

		if (top < 0) {
			top = 0;
		} else if (top > $WINDOW.height()) {
			top = $WINDOW.height() / 2;
		}

		if (left < 0) {
			left = 0;
		} else if (left > $WINDOW.width()) {
			left = $WINDOW.width() / 2;
		}

		return {
			top: top,
			left: left
		};
	}