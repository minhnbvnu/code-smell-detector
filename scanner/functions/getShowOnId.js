function getShowOnId(showOn) {
		// Store a unique id on the showOn function.
		// See full explanation at top of file.
		if (!showOn.showOnId) {
			showOn.showOnId = ++uid;
		}
		return showOn.showOnId;
	}