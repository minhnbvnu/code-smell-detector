function fixRange(range) {
		fixBoundaryPoint(range.startContainer, range.startOffset, range, range.setStart);
		fixBoundaryPoint(range.endContainer, range.endOffset, range, range.setEnd);
	}