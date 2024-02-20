function removeExtraneousLineBreaksFrom(node) {
		removeExtraneousLineBreaksBefore(node);
		removeExtraneousLineBreaksAtTheEndOf(node);
	}