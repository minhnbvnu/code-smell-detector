function isEventResizable(event) { // but also need to make sure the seg.isEnd == true
		return isEventEditable(event) && !opt('disableResizing');
	}