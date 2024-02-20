function decodeLineSegmentArray(value) {
	return parseArray(value, decodeLineSegment);
}