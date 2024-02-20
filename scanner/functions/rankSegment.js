function rankSegment(segment) {
	return segment.charAt(0) == ':'
		? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4
		: 5;
}