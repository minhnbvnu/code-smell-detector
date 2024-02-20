function isFetchNeeded(start, end) {
		return !rangeStart || start < rangeStart || end > rangeEnd;
	}