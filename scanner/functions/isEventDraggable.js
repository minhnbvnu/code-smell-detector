function isEventDraggable(event) {
		return isEventEditable(event) && !opt('disableDragging');
	}